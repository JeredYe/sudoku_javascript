var matrix = new Array(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0)
);
var ans = new Array(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0)
);

function generateMap() {
    Generate();
    for (let i = 0; i < 9; ++i)
        for (let j = 0; j < 9; ++j)
            ans[i][j] = matrix[i][j];
    for (let i = 1; i <= 9; ++i) {
        for (let j = 1; j <= 9; ++j) {
            let obj = document.getElementById("b" + i + "" + j);
            obj.innerText = matrix[i - 1][j - 1];
            obj.disabled = true;
            //console.log(matrix[i-1][j-1]);

        }
    }
    let num = NextRandom(10, 35);
    for (let j = 0; j < num; j++) {
        let num5 = NextRandom(0, 8);
        let num6 = NextRandom(0, 8);
        if (matrix[num6][num5] == 0) {
            j--;
        }
        else {
            matrix[num6][num5] = 0;
            let obj = document.getElementById("b" + (num6 + 1) + "" + (num5 + 1));
            obj.innerText = "?";
            obj.disabled = false;
        }
    }
};
function clickEvent(id) {
    let sender = document.getElementById(id);
    let num = prompt("请输入所填的数字：");
    if (num != null && !(num[0] > '9' || num[0] <= '0')) {
        sender.innerText = num[0];
        matrix[id[1] - 1][id[2] - 1] = num;
    }
    let flag = true;
    for (let i = 0; i < 9; ++i)
        for (let j = 0; j < 9; ++j)
            if (ans[i][j] != matrix[i][j])
                flag = false;
    if (flag)
        alert("恭喜你已通关！");
};

const Root = {
    template: "",

    data() {
        return null;
    }
}

for (let i = 1; i <= 9; ++i) {
    for (let j = 1; j <= 9; ++j) {
        Root.template += "<button id=\"b" + i + "" + j +
            "\" style=\"height:60px;width:60px;display:inline-block;font-size:30px\" onclick=\"clickEvent(id);\"></button>";


        if (j % 3 == 0) Root.template += "&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    Root.template += '<br/>';
    if (i % 3 == 0)
        Root.template += '<br/>';
};


const App = Vue.createApp(Root);
let obj = App.mount("#root");