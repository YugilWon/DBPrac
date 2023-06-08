// 입력폼 이벤트 리스너
const commentForm = document.getElementById("comment-form");
const commentContainer = document.getElementById("comment-container");
commentForm.addEventListener("submit", handleFormSubmit);

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// 댓글 작성하기 버튼 클릭 시 댓글 작성 폼 디스플레이
const showCommentFormButton = document.getElementById(
  "show-comment-form-button"
);
showCommentFormButton.addEventListener("click", toggleCommentForm);

function toggleCommentForm() {
  const commentForm = document.getElementById("comment-form");
  if (commentForm.style.display === "none") {
    commentForm.style.display = "block";
  } else {
    commentForm.style.display = "none";
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const authorInput = document.getElementById("author");
  const passwordInput = document.getElementById("password");
  const commentInput = document.getElementById("comment");
  const movieIdInput = document.getElementById("movieId");

  const author = authorInput.value;
  const password = passwordInput.value;
  const text = commentInput.value;
  const movieId = id;

  const comment = {
    author: author,
    password: password,
    comment: text,
    movieId: movieId,
  };

  await saveComment(comment);
  displayComments();

  // 입력 필드 초기화
  authorInput.value = "";
  passwordInput.value = "";
  commentInput.value = "";
}

async function saveComment(comment) {
  try {
    const data = { ...comment, movieId: comment.movieId }; // comment 객체에 movieId 추가
    const response = await fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    });
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error("Error:", error);
  }
}

// 페이지 로드 시 디스플레이
window.addEventListener("load", () => {
  displayComments(id);
});

async function displayComments(id) {
  try {
    const response = await fetch(`/comments?id=${id}`);
    const data = await response.text();
    const comments = JSON.parse(data);

    // 이전 댓글 삭제
    commentContainer.innerHTML = "";

    // 가져온 댓글 데이터를 사용하여 각각의 댓글을 표시합니다.
    comments.forEach(function (comment) {
      displayComment(comment);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayComment(comment) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  const authorElement = document.createElement("span");
  authorElement.classList.add("comment-author");
  authorElement.textContent = comment.author;

  const textElement = document.createElement("p");
  textElement.classList.add("comment-text");
  textElement.textContent = comment.text;

  commentElement.appendChild(authorElement);
  commentElement.appendChild(textElement);

  commentContainer.appendChild(commentElement);
}

// 페이지 로드 시 코멘트폼 안보이게
toggleCommentForm();
