const convert_number = (str) => (str.split(',').length > 1) ? (str.split(',').join('') * 1) : (str * 1);

/* Jango Statistics
 * arguments
 *  - string::data csv data(delimiter: \t)
 */
function main(data)
{
    var today = new Date();
    var [year, month, day] = [String(today.getFullYear()), String(today.getMonth() + 1), String(today.getDate())];
    var [rowArr, rlen] = [[], 0];
    var [colArr, clen] = [[], 0];

    // ���¹�ȣ �ǰ��¹�ȣ �ŷ��� �����ڵ� ����� ���� ���簡 �򰡱�
    rowArr = data.split('\n').filter(row => row.length);
    rlen = rowArr.length;

    colArr = rowArr.map(row => row.split('\t'));
    clen = colArr.length;

    // header
    var result = [["���س�","���ؿ�","������","����","�ŷ���","����","���ǻ�","�����ڵ�","�����","�������","���¼�","��������","�����ݾ�"]];
    var i, col, rtn, contry, exchange, short_cd, std_name, pos_qty, close;
    for(i = 1; i < clen; i++) {
        col = colArr[i];
        [exchange, short_cd, std_name, pos_qty, close] = [col[2], col[3], col[4], convert_number(col[5]), convert_number(col[6])];

        if(pos_qty == 0) {
            continue;
        }

        rtn = result.findIndex(ele => ((ele[4] + "-" + ele[7]) == (exchange + "-" + short_cd)));
        if(rtn < 0) {
            // push
            switch(col[2]) {
                case "KRXC":
                    contry = "�ѱ�";
                    break;
                case "XNAS":
                case "XNYS":
                case "XAMX":
                    contry = "�̱�";
                break;
                default:
                    continue;
            }
            result.push([year, month, day, contry, exchange, "", "KB����", short_cd, std_name, "", 1, pos_qty, (pos_qty * close)]);
            continue;
        }

        // increment
        result[rtn][10] += 1;
        result[rtn][11] += pos_qty;
        result[rtn][12] += (pos_qty * close);
    }

    result.sort((a, b) => [a[4], a[7]].join('-').localeCompare([b[4], b[7]].join('-'))).map(row => row.join(',')).forEach(row => console.log(row));
}



main(`
`);
