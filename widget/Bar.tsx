import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable } from "astal"
import MyButton from "./MyButton"
import { Counter } from "./MyButton"
import { MyInput } from "./MyInput"

// const time = Variable("").poll(1000, "date")

// export default function Bar(gdkmonitor: Gdk.Monitor) {
//     return <window
//         className="Bar"
//         gdkmonitor={gdkmonitor}
//         exclusivity={Astal.Exclusivity.EXCLUSIVE}
//         anchor={Astal.WindowAnchor.TOP
//             | Astal.WindowAnchor.LEFT
//             | Astal.WindowAnchor.RIGHT}
//         application={App}>
//         <centerbox>
//             <button
//                 onClicked="echo hello"
//                 halign={Gtk.Align.CENTER} >
//                 Welcome to AGS!
//             </button>
//             <box />
//             <button
//                 onClick={() => print("hello")}
//                 halign={Gtk.Align.CENTER} >
//                 <label label={time()} />
//             </button>
//         </centerbox>
//     </window>
// }

export default function    Bar(monitor = 0) {
    return <window className="Bar" monitor={monitor} anchor={Astal.WindowAnchor.BOTTOM
        | Astal.WindowAnchor.RIGHT}>
        <box>
            <MyInput />
        </box>
    </window>
}