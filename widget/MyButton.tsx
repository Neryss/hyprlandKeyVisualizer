import { Variable, bind } from "astal"

export default function MyButton(): JSX.Element {
    const   label = "Click me uwu"
    return <button onClicked="echo hello">
        <label label={label}></label>
    </button>
}

export function Counter() {
    const   count = Variable(0)

    function    increment() {
        count.set(count.get() + 1)
    }

    return <box>
        <label label={bind(count).as(num => num.toString())} />
        <button onClicked={increment}>
            Click here to increment
        </button>
    </box>
}