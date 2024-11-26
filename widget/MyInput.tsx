import { subprocess } from "../../../../../usr/share/astal/gjs"; 
import { Variable, bind } from "astal"

let   last_key_time = 0;


export function MyInput() {
    let     timer: any;
    let     keys_buffer: Array<string> = [];

    function    resetTimer() {
        if (timer)
            clearInterval(timer);
        timer = setInterval(function() {
            keys_buffer = [];
            updateDisplay(keys_buffer);
        }, 5000)
    }
    
    const   letter = Variable("")

    function updateDisplay(newKey: Array<string>) {
        // let tmp: string = "";
        // for (let i = 0; i < newKey.length; i++)
        //     tmp += newKey[i] + " ";
        letter.set(newKey.join("|"));
    }


    subprocess("sudo keyd monitor", (output) => {
        if (!output || output.includes('device added:') || !output.includes("Razer Huntsman Mini")) return;
        console.log("Callback triggered");
        let rest = output.slice(output.lastIndexOf("\t") + 1);
        let item = rest.split(' ');

        if (item[1] === "down")
        {
            const   current_time = Date.now();
            const   time_since_last_press = current_time - last_key_time;
            last_key_time = current_time;

            resetTimer();
            keys_buffer.push(item[0]);
            if (keys_buffer.length > 10)
                keys_buffer.shift();
            updateDisplay(keys_buffer);
            console.log(`Added: ${item[0]}`);
            // console.log(`${item[0]} | ${item[1]}`);
            // letter.set(item[0])
        }
        else
            console.log("Up");
    });

    return <box>
        <label label={bind(letter)}></label>
    </box>
}