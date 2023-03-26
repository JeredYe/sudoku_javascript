let SAVED = false;
let Selected = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0), Chart = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);

function JudgeHorizonal(y, num) {
    for (let i = 0; i < 9; i++) {
        if (matrix[y][i] == num) {
            return false;
        }
    }
    return true;
}

function JudgeVertical(x, num) {
    for (let i = 0; i < 9; i++) {
        if (matrix[i][x] == num) {
            return false;
        }
    }
    return true;
}

function GetID(x, y) {
    let num = 0;
    if ((x >= 0) && (x <= 2)) {
        num++;
    }
    if ((x >= 3) && (x <= 5)) {
        num += 2;
    }
    if ((x >= 6) && (x <= 8)) {
        num += 3;
    }
    if ((y >= 3) && (y <= 5)) {
        num += 3;
    }
    if ((y >= 6) && (y <= 8)) {
        num += 6;
    }
    return num;
}
function Judge(x, y, num) {
    if (!JudgeHorizonal(y, num)) {
        return false;
    }
    if (!JudgeVertical(x, num)) {
        return false;
    }
    let iD = GetID(x, y);
    let num3 = 0;
    let num4 = 0;
    switch (iD) {
        case 1:
            num3 = 0;
            num4 = 0;
            break;

        case 2:
            num3 = 3;
            num4 = 0;
            break;

        case 3:
            num3 = 6;
            num4 = 0;
            break;

        case 4:
            num3 = 0;
            num4 = 3;
            break;

        case 5:
            num3 = 3;
            num4 = 3;
            break;

        case 6:
            num3 = 6;
            num4 = 3;
            break;

        case 7:
            num3 = 0;
            num4 = 6;
            break;

        case 8:
            num3 = 3;
            num4 = 6;
            break;

        case 9:
            num3 = 6;
            num4 = 6;
            break;
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[num4 + i][num3 + j] == num) {
                return false;
            }
        }
    }
    return true;
}
function DFS(Line, X) {
    if (!SAVED) {
        if (Line == 9) {
            SAVED = true;
        }
        else {
            let numArray = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
            let num = NextRandom(5, 10);
            for (let i = 0; i < num; i++) {
                let index = NextRandom(0, 8);
                let num4 = NextRandom(0, 8);
                let num5 = numArray[index];
                numArray[index] = numArray[num4];
                numArray[num4] = num5;
            }
            for (let j = X; j < 9; j++) {
                let flag = true;
                let num7 = 0;
                while (num7 < 9) {
                    if (numArray[num7] != 0) {
                        if (Selected[numArray[num7] - 1] == 9) {
                            num7++;
                            break;
                        }
                        if (Judge(X, Line, numArray[num7])) {
                            flag = false;
                            break;
                        }
                    }
                    numArray[num7] = 0;
                    num7++;
                }
                if (flag) {
                    return;
                }
                matrix[Line][X] = Chart[numArray[num7] - 1];
                numArray[num7] = 0;
                Selected[num7]++;
                if (X == 8) {
                    DFS(Line + 1, 0);
                }
                else {
                    DFS(Line, X + 1);
                }
                if (SAVED) {
                    return;
                }
                Selected[num7]--;
                matrix[Line][X] = 0;
                j--;
            }
        }
    }
}
function NextRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);;
}
function Generate() {
    matrix = new Array(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        new Array(0, 0, 0, 0, 0, 0, 0, 0, 0)
    );
    Selected = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    Chart = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    SAVED = false;
    let numArray = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    let num = 0;
    while (num < 9) {
        let index = NextRandom(0, 8);
        if (numArray[index] != 0) {
            matrix[0][num++] = numArray[index];
            Selected[numArray[index] - 1]++;
            numArray[index] = 0;
        }
    }
    DFS(1, 0);
    // for(let i=0;i<9;++i)
    //     for(let j=0;j<9;++j)
    //     console.log(matrix[i][j]);
    return;
}
