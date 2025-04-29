const fs = require('fs');
const path = require('path');

const makeHeader = (format, titleArr) => {
    let header = "";

    if(format != null) {
        const temp = [];
        for(const key in format) {
            temp.push(`"${key}"`);
        }
        header = temp.join(",");
    }
    else {
        header = `${titleArr.map((ele) => `"${ele}"`).join(",")}`;
    }

    return header;
}

const slicePacket = (packet, size) => {
    let [result, pos, pPos] = ["", 0, 0];
    while(pPos < size) {
        result += packet[pos] || "@";
        pPos += packet.charCodeAt(pos) >= 127 ? 2 : 1;
        pos++;
    }

    return result;
};

const exportCSV = (format = null, packet, titleArr, sizeArr, fileName = "data.csv") => {
    if(titleArr.length != sizeArr.length) {
        console.log("titleArr size diffrent sizeArr size", titleArr.length, ":", sizeArr.length);
        return 0;
    }

    const struct = new Map();
    const COLS_CNT = titleArr.length;
    let pos = 0;
    for(pos = 0; pos < COLS_CNT; pos++) {
        struct.set(titleArr[pos], sizeArr[pos]);
    }

    const SZ_STRUCT = sizeArr.reduce((acc, cur) => acc + cur);
    const rowCnt = packet.length / SZ_STRUCT;

    const rows = [];

    let temp = [];
    let value = "";
    for(let cnt = 0; cnt < rowCnt; cnt++) {
        temp = [];
        struct.forEach(size => {
            value = slicePacket(packet, size);
            temp.push(`"${value.trim()}"`);
            packet = packet.substring(value.length);
        });
        rows.push([...temp]);
    }

    // body
    if(format != null) {
        let rows_cp = [...rows];
        rows.splice(0);

        // rows
        let cpos = 0;
        rows_cp.forEach(row => {
            temp = [];
            // format
            for(const key in format) {
                cpos = 0;
                for(const [title, size] of struct.entries()) {
                    if(format[key] == title) {
                        break;
                    }

                    cpos++;
                }
                temp.push(row[cpos]);
            }
            rows.push([...temp]);
        });
    }

    // header
    rows.unshift(makeHeader(format, titleArr));

    // csv
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath,  "\uFEFF" + rows.join("\n"), 'utf-8');


    return 0;
};

const packet = "";

const format = {
    
};
const titleArr = [

];
const sizeArr = [

];


exportCSV(format, packet, titleArr, sizeArr);
