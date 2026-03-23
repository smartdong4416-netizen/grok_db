import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

//////////////////////////////


// 新增資料
window.addNote = async function () {
    const input_title = document.getElementById("input_title").value;
    const input_category = document.getElementById("input_category").value;
    const input_summary = document.getElementById("input_summary").value;

    await addDoc(collection(db, "notes"), {
      input_title,
      input_category,
      input_summary,
      createdAt: new Date()
    });

    alert("儲存完成！");
    loadNotes();
};



// 讀取資料
async function loadNotes() {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const note_list = document.getElementById("note_list");
    note_list.innerHTML = "";

    querySnapshot.forEach(doc => {
        const data = doc.data();

        const note = document.createElement("div");

        note.classList.add("note");
        note.id = data.input_title;
        //note.textContent = data.input_title + '\n' + data.input_category + '\n' + data.input_summary;
        note.innerHTML = "標題 : "+data.input_title + '<br>' +"類別 : "+ data.input_category + '<br>' +"摘要 : "+ data.input_summary;

        note_list.appendChild(note);

    });
}

loadNotes();


