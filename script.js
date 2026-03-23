import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


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
        createdAt: new Date()
    });

    alert("儲存完成！");



    loadNotes();

    document.getElementById("input_title").value = "";
    document.getElementById("input_category").value = "";
    document.getElementById("input_summary").value = "";
}
)



// 讀取資料
async function loadNotes() {
    //const querySnapshot = await getDocs(collection(db, "notes"),orderBy("createdAt"));

    const q = query(collection(db, "notes"), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);

    const note_list = document.getElementById("note_list");
    note_list.innerHTML = "";

    querySnapshot.forEach(doc => {
        const data = doc.data();

        const note = document.createElement("div");

        note.classList.add("note");
        //note.id = data.input_title;
        note.dataset.id = doc.id;
        note.textContent = "標題 : "+data.title +'\n'+"類別 : "+ data.category +'\n'+"摘要 : "+ data.summary;
        //note.innerHTML = "標題 : "+data.input_title + '<br>' +"類別 : "+ data.input_category + '<br>' +"摘要 : "+ data.input_summary;

        note_list.appendChild(note);

    });
}

loadNotes();


