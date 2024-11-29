import { subprocess } from "../../../../../usr/share/astal/gjs"; 
import { Variable, bind } from "astal"

let   last_key_time = 0;


export function MyInput() {
    interface   Specs
    {
        ctrl: boolean,
        alt: boolean,
        shift: boolean
    };

    let     timer: any;
    let     keys_buffer: Array<string> = [];
    let     specs: Specs = {ctrl:false, alt:false, shift: false};

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
        if (specs.ctrl)
            letter.set(newKey.join("+"));
        else
            letter.set(newKey.join("|"));
    }


    subprocess("sudo keyd monitor", (output) => {
        if (!output || output.includes('device added:') || !output.includes("Razer Huntsman Mini")) return;
        let rest = output.slice(output.lastIndexOf("\t") + 1);
        let item = rest.split(' ');
        let     string_buffer: string = "";

        if (item[1] === "down")
        {
            // const   current_time = Date.now();
            // last_key_time = current_time;

            resetTimer();
            if (specs.ctrl || specs.shift || specs.alt)
                keys_buffer.push("+");
            else
                keys_buffer.push("|");
            if (item[0] === "space")
                keys_buffer.push("[SP]");
            else if (item[0] === "backspace")
                keys_buffer.push("[BCKSP]");
            else if (item[0] === "enter")
                keys_buffer.push("[ENTER]");
            else if (item[0] === "leftshift" || item[0] === "rightshift")
            {
                keys_buffer.push("[SHIFT]");
                specs.shift = true;
            }
            else if (item[0] === "leftcontrol" || item[0] === "rightcontrol")
            {
                keys_buffer.push("[CTRL]");
                specs.ctrl = true;
            }
            else if (item[0] === "leftalt" || item[0] === "rightalt")
            {
                keys_buffer.push("[ALT]");
                specs.alt = true;
            }
            else
                keys_buffer.push(item[0].toUpperCase());
            if (keys_buffer.length > 10)
            {
                keys_buffer.shift();
                keys_buffer.shift();
            }
        }
        else if (item[1] === "up")
        {
            if (item[0] === "leftcontrol" || item[0] === "rightcontrol")
                specs.ctrl = false;
            if (item[0] === "leftshift" || item[0] === "rightshift")
                specs.shift = false;
            if (item[0] === "leftalt" || item[0] === "rightalt")
                specs.alt = false;
        }
        letter.set(keys_buffer.join(""))
    });
    
    return <box className="main-box">
        <box>
            <label label={bind(letter)}></label>
        </box>
    </box>
}