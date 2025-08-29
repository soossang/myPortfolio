var listNo=0;

function addTask (){
    const taskInputEl=$("#taskInput");
    const trEl=$("tr");
    let task=taskInputEl.value;

    if(task==""){
        alert("할일을 입력해주세요!");
        taskInputEl.focus();
        return;
    }

    let html=`<td class="align-center">${++listNo}</td><td onclick="drawline(this)">${task}</td><td class="align-center"><input type="checkbox"></td>`;
    trEl.innerHTML=html;
    document.querySelector("table").appendChild(trEl);
    taskInputEl.value="";
}

function delTask(){
    const checkList=document.querySeletorAll("td > [type='checkbox']");
    const tableEl=document.querySeletor("table");

    for(let i=0;i<checkList.length;i++){
        if(checkList[i].checked){
            tableEl.removeChild(checkList[i].parentElement.parentElement);
        } 
    }
    document.querySelector("th > [type='checkbox']").checked=false;
}

function allcheck(ckbx){
    let check=ckbx.checked;
    $("td > [type='checkbox']").each(function() {
        $(this).prop("checked", check);
    });
}

function inputKey(e){
    //console.log(e.key);
    if(e.key=='Enter') addTask();
}

function drawline(tdEl) {
    tdEl.classList.toggle("through-line");
}

var postNo=0;

function writePost(){
    let title=$("[name='title']").val();
    let content=$("[name='content']").val();
    let name=$("[name='name']").val();

    if(title==""){
        alert("제목을 입력해주세요.");
        $("[name='title']").focus();
        return;
    }
    if(content==""){
        alert("내용을 입력해주세요.");
        $("[name='content']").focus();
        return;
    }
    if(name==""){
        alert("작성자를 입력해주세요.");
        $("[name='name']").focus();
        return;
    }

    const date=new Data();
    const year=data.getFullYear();
    const month=String(date.getMonth()+1).padStart(2,'0');
    const day=String(date.getDate()).padStart(2,'0');
    let writeDate=`${year}-${month}-${day}`;

    const tableEl=$("#list> table");
    const trEl=$("<tr>");

    postNo++
    let html=`<td><input type="checkbox"></td>
              <td id="no${postNo}">${postNo}</td>
              <td class="mouse-over" onclick="openRead(this)">${title}</td>
              <td>${content}</td>
              <td>${name}</td>
              <td>${writeDate}</td>`;

    trEl.innerHTML=html;
    tableEl.appendChild(trEl);
    titleEl.value="";
    contentEl.value="";
    nameEl.value="";

    closeWrite();   
}

$(document).ready(function() {
    $('[value="글쓰기"]').on('click',
    function (){
        $("#inputForm").show();
    });
});

function openRead(titleEl){
    const noEl=$(titleEl).prev();
    const contentEl=$(titleEl).next;
    const nameEl=contentEl.next();
    const dataEl=nameEl.next();

    let no=noEl.text();
    let title=$(titleEl).text();
    let content=contentEl.text();
    let name=nameEl.text();
    let date=dateEl.text();

    $("#read-no").text=(no);
    $("#read-title").text=(title);
    $("#read-content").text=(content);
    $("#read-name").text=(name);
    $("#read-date").text=(date);

    $("#save-button").hide();
    $("#readForm").show();
}

function closeRead(){
    $("#readForm").hide();
    $("#save-button").hide();
    $("#edit-button").show();
}

function edit_post(){
    const titleEl=$("#read-title");
    const contentEl=$("#read-content");
    let title=titleEl.text();
    let content=contentEl.text();

    titleEl.innerHTML=`<input type="text" value="${title}" id="edit_title">`;
    contentEl.innerHTML=`<input type="text" value="${content}" id="edit_content">`;

    $("#save-button").show();
    $("#edit-button").hide();
}

function save_post(){
    let title=$("#read-title").children().val();
    let content=$("#read-content").children().val();
    let postNoId="no"+ $("#read-no").text();
    
    $(`[id=${postNoId}]`).next().text(title);
    $(`[id=${postNoId}]`).next().next().text(content);
    closeRead();

}