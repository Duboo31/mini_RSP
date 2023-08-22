const userBtns = document.querySelectorAll(".btn");
const compView = document.querySelectorAll(".comOutput");
const startBtn = document.querySelector(".startBtn");
const endBtn = document.querySelector(".endBtn");
const resetBtn = document.querySelector(".reset");

const tableEl = document.querySelector("table");

const mySelEl = document.querySelector(".mySel");

let winText = document.querySelector(".win");
let loseText = document.querySelector(".lose");
let tieText = document.querySelector(".tie");

const userSeletedBtn = [0, 1, 2];
const computerRandom = [0, 1, 2];

let userSel;
let compSel;

let winCnt = 0;
let loseCnt = 0;
let tieCnt = 0;

const startGame = () => {
  userBtns.forEach((btn) => {
    btn.disabled = false;
  });
  endBtn.disabled = false;
};

const selectBtn = (e) => {
  let compRandom = Math.floor(Math.random() * 3);
  let curComSel = computerRandom[compRandom];
  console.log("컴퓨터 값: ", curComSel);
  colorView(curComSel);
  curUserVal = e.target.innerText;
  mySelEl.innerText = curUserVal;
  mySelEl.classList.add("mySel");

  if (curUserVal === "가위" && curComSel === 0) {
    tieCnt++;
    tieText.innerText = tieCnt;
    console.log("가위 가위 무승부");
  } else if (curUserVal === "바위" && curComSel === 1) {
    tieCnt++;
    tieText.innerText = tieCnt;
    console.log("바위 바위 무승부");
  } else if (curUserVal === "보" && curComSel === 2) {
    tieCnt++;
    tieText.innerText = tieCnt;
    console.log("보 보 무승부");
  } else if (curUserVal === "가위" && curComSel === 2) {
    winCnt++;
    winText.innerText = winCnt;
    console.log("가위 보 승");
  } else if (curUserVal === "가위" && curComSel === 1) {
    loseCnt++;
    loseText.innerText = loseCnt;
    console.log("가위 바위 패");
  } else if (curUserVal === "바위" && curComSel === 0) {
    winCnt++;
    winText.innerText = winCnt;
    console.log("바위 가위 승");
  } else if (curUserVal === "바위" && curComSel === 2) {
    loseCnt++;
    loseText.innerText = loseCnt;
    console.log("바위 보 패");
  } else if (curUserVal === "보" && curComSel === 1) {
    winCnt++;
    winText.innerText = winCnt;
    console.log("보 바위 승");
  } else if (curUserVal === "보" && curComSel === 0) {
    loseCnt++;
    loseText.innerText = loseCnt;
    console.log("보 가위 패");
  }
};

// 컴터 선택 보이기
const colorView = (curVal) => {
  for (let i = 0; i < 3; i++) {
    compView[i].classList.remove("currentView");
  }
  compView[curVal].classList.add("currentView");
};

const endBtnActive = () => {
  console.log(winCnt, loseCnt, tieCnt);

  let formData = new FormData();
  formData.append("winCnt_give", winCnt);
  formData.append("loseCnt_give", loseCnt);
  formData.append("tieCnt_give", tieCnt);

  fetch("/score", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      console.log("데이터 생성 완료", data);
      location.reload();
    });
};

const printScore = () => {
  fetch("/getScore")
    .then((res) => res.json())
    .then((data) => {
      let socres = data.allScore;

      socres.forEach((el) => {
        console.log(el);
        let trEl = document.createElement("tr");
        let tdWin = document.createElement("td");
        let tdLose = document.createElement("td");
        let tdTie = document.createElement("td");

        tdWin.innerText = el.winCnt_receive;
        tdLose.innerText = el.loseCnt_receive;
        tdTie.innerText = el.tieCnt_receive;
        tdWin.classList.add("tit2");
        tdLose.classList.add("tit2");
        tdTie.classList.add("tit2");

        trEl.append(tdWin);
        trEl.append(tdLose);
        trEl.append(tdTie);

        tableEl.appendChild(trEl);
      });
    });
};

const resetActive = () => {
  fetch("/resetScore", { method: "DELETE" })
    .then((res) => res.json())
    .then(() => {
      location.reload();
    });
};

// 로드시 실행 함수
printScore();

// 이벤트 ---------------------------------------------------------------
userBtns.forEach((el) => {
  el.addEventListener("click", selectBtn);
});

startBtn.addEventListener("click", startGame);
endBtn.addEventListener("click", endBtnActive);
resetBtn.addEventListener("click", resetActive);
