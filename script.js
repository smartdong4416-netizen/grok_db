import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, updateDoc, serverTimestamp} 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 資料庫設定
const firebaseConfig = {
    apiKey: "AIzaSyBwKqGwiie4GmEQpre2jtCTMZZxX6V--nM",
    authDomain: "grok-db.firebaseapp.com",
    projectId: "grok-db",
    storageBucket: "grok-db.firebasestorage.app",
    messagingSenderId: "856809230800",
    appId: "1:856809230800:web:0c4f6485bce5b1771fa9d5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// 新增資料
const add_note_btn = document.getElementById("add_note_btn");

add_note_btn.addEventListener("click",

    async function () {
    const title = document.getElementById("input_title").value;
    const category = document.getElementById("input_category").value;
    const summary = document.getElementById("input_summary").value;

    if(title === "" || category === "" || summary === ""){
        alert("請輸入完整資料");
        return
    }

    await addDoc(collection(db, "notes"), {
        title,
        category,
        summary,
        createdAt: serverTimestamp()
    });


    document.getElementById("input_title").value = "";
    document.getElementById("input_category").value = "";
    document.getElementById("input_summary").value = "";



}
)


// 詳細資料

function openDetailPanel(id, data) {
    const panel = document.getElementById("detail_panel");

    panel.classList.add("open");

    // 填資料
    document.getElementById("detail_title").value = data.title;
    document.getElementById("detail_category").value = data.category;
    document.getElementById("detail_summary").value = data.summary;

    // 存目前選到的 doc id（之後更新用）
    panel.dataset.id = id;
}

document.getElementById("close_btn").addEventListener("click", () => {
    document.getElementById("detail_panel").classList.remove("open"); // 移除 open 類 所以會收回去
});

document.getElementById("save_btn").addEventListener("click", async () => {
    const panel = document.getElementById("detail_panel");
    const id = panel.dataset.id;

    const newTitle = document.getElementById("detail_title").value;
    const newCategory = document.getElementById("detail_category").value;
    const newSummary = document.getElementById("detail_summary").value;

    await updateDoc(doc(db, "notes", id), {
        title: newTitle,
        category: newCategory,
        summary: newSummary
    });

    panel.classList.remove("open");

});


// onsnapshot
const note_list = document.getElementById("note_list");

const q = query(collection(db, "notes"), orderBy("createdAt"));

onSnapshot(q, (snapshot) => {
    note_list.innerHTML = "";

    snapshot.forEach(docSnap => {
        const data = docSnap.data();

        const note = document.createElement("div");
        note.classList.add("note");
        note.dataset.id = docSnap.id;

        note.textContent =
          "標題 : " + data.title + '\n' +
          "類別 : " + data.category + '\n' +
          "摘要 : " + data.summary;

        note.addEventListener("click", () => {
            openDetailPanel(docSnap.id, data);
        });

        note_list.appendChild(note);
    });
});


