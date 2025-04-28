const transformPacket = (strArr) => {
    const result = [];
    let temp = "";

    strArr.sort();

    for(let index = 0; index < strArr.length; index++) {
        if(strArr[index] == temp) {
            continue;
        }
        else {
            result.push(strArr[index]);
            temp = strArr[index];
        }
    }

    result.forEach((ele) => console.log(ele));
    return 0;
};

const s_arr = [
    "A",
    "AA",
    "AAA",
    "ABA",
    "AA",
    "A",
];

transformPacket(s_arr);