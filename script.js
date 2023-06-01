// 영화 리스트 보여주기
function showMovieList(val) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmVjM2U3MzdhYzIyZDQxOGExZTBmNGRmZTEzNTY3ZiIsInN1YiI6IjY0NzFiZjQ0YmUyZDQ5MDExNmM4YTk2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JvZ2uXWJg9pC1AfqkJeUENhOZIGdg7e9flH1BDoX6ME",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data["results"];
      results.forEach((a, i) => {
        let title = a["title"];
        let id = a["id"];
        let overview = a["overview"];
        let date = a["release_date"];
        let average = a["vote_average"];
        let poster = `https://image.tmdb.org/t/p/w200` + a["poster_path"];
        let rank = i + 1;
        // 대소문자 구분 없이 입력한 제목에 따른 영화 검색하기
        if (title.toLowerCase().includes(val.toLowerCase())) {
          const movieInfo = document.createElement("li");
          movieInfo.innerHTML = ` <div class= "wrap">
			                              <img src=${poster} alt="Movie Poster">
                                    <h3>${rank}</h3>
			                              <span>${overview}</span>
                                    <p>${id}</p>
			                            </div>
			                            <h2>${title}</h2>
			                            <p>개봉 ${date} 평점 ${average}</p>`;
          document.querySelector("#movieList").appendChild(movieInfo);
        }
      });
    })
    .catch((err) => console.error(err));
}

// "" 가 입력된 상태로 함수 실행 --> 영화 전체목록 보여줌
showMovieList("");

// 영화 검색기능
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", showSearchList);

function showSearchList(e) {
  movieList.innerHTML = ""; // 빈 여백값으로 만듬
  e.preventDefault(); // 브라우저의 기본동작 제한, 폼 제출시 페이지가 새로고침 되는 것을 막음
  const val = searchInput.value;
  showMovieList(val);
}

// id 조회기능
const movieList = document.getElementById("movieList");
function showMovieInfo(e) {
  const wrapElement = e.target.closest(".wrap");
  if (wrapElement) {
    const title = wrapElement.nextElementSibling.textContent;
    const id = wrapElement.querySelector("p").textContent;

    alert(`"${title}" 의 id는 "${id}" 입니다.`);
  }
}
movieList.addEventListener("click", showMovieInfo);

// 페이지 로드시 커서 입력창에 위치
window.onload = function () {
  searchInput.focus();
};

// topBtn 클릭시 페이지 최상단으로 이동 (화살표함수)
const topBtn = document.getElementById("topBtn");
const showTopPage = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

topBtn.addEventListener("click", showTopPage);
