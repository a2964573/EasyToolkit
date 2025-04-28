const slicePacket = (packet, size) => {
    let [result, pos, pPos] = ["", 0, 0];
    while(pPos < size) {
        result += packet[pos] || "@";
        pPos += packet.charCodeAt(pos) >= 127 ? 2 : 1;
        pos++;
    }

    return result;
};

const transformPacket = (packet, titleArr, sizeArr) => {
    const [result, pArr, gArr] = [[], [], []];
    let pTitle, pSize, pValue, gCnt = 2;

    for(let index = 0; index < titleArr.length; index++) {
        switch(typeof titleArr[index]) {
            case "object":
                if(!Array.isArray(titleArr[index])) break;

                for(let index2 = 0; index2 < gCnt; index2++){
                    titleArr[index].forEach((title, tIndex) => {
                        pTitle = title;
                        pSize = sizeArr[index][tIndex];
                        pArr.push(slicePacket(packet, pSize));
                        pValue = pArr[pArr.length - 1];
                        packet = packet.substring(pValue.length);
                        gArr.push((tIndex ? "\n" : "") + "    [" + pSize.toString().padEnd(3, ' ') + "]" + pTitle + ": \"" + pValue + "\"");
                    });

                    result.push("grid[" + index2 + "][\n" + [...gArr] + "\n]");
                    gArr.splice(0);
                }
            break;
            default:
                pTitle = titleArr[index];
                pSize = sizeArr[index];
                pArr.push(slicePacket(packet, pSize));
                pValue = pArr[pArr.length - 1];
                packet = packet.substring(pValue.length);
                result.push(`[${pSize.toString().padEnd(3, ' ')}] ${pTitle} : "${pValue}"`);

                if(!!pTitle.match(/grid|grd/igm)?.length && !!pTitle.match(/count|cnt/igm)?.length) {
                    gCnt = pValue;
                }
            break;
        }
    }

    result.forEach((ele) => console.log(ele));
    return 0;
};

const packet = "Incheon     ȫ�浿      25      @@";
const titleArr = [
    "addreses",
    "name    ",
    "age     ",
];
const sizeArr = [
    12,
    12,
    8 ,
];


transformPacket(packet, titleArr, sizeArr);