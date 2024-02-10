function cardShow(data) {
  console.log(data, 'data');
  if (data.chapters === null) {
    data.chapters = 'on Going';
  }
  return `<div class="card__1"
    style="display: flex; flex-direction: row; gap: 10px;">
    <img src="${data.images.jpg.large_image_url}" alt="manga-image"
       class="card__image"
       style="height: 200px; width: 120px; border: 1px solid lightblue; cursor: pointer;">
    <div class="card__item"
       style="display: flex; flex-direction: column; justify-content: space-around;">
       <div class="card__item__title" style="font-weight: 600; color: rgb(21, 21, 190); cursor: pointer;">
          ${data.title}
       </div>
       <div class="card__item__rating" style="color: whitesmoke;">
          Rate : &star; ${data.score}
       </div>
       <div class="card__item__chapter" style="font-weight: 600; width: 100px; font-size: 13px; background-color: lightgrey; padding: 5px; text-align: center;">
          Rank : ${data.rank}
       </div>
       <div class="card__item__createdat" style="color: whitesmoke;">
          Total Chapters: ${data.chapters}
       </div>
    </div>
 </div>`;
}

const nextbutton = document.getElementById('pagination__next');
const prevbutton = document.getElementById('pagination__prev');
const pagedisplay = document.getElementById('pagination__page');

console.log(pagedisplay.innerHTML);

let pagenumber = 1;

nextbutton.addEventListener('click', () => {
  pagenumber += 1;

  pagedisplay.textContent = pagenumber;
});

prevbutton.addEventListener('click', () => {
  pagenumber -= 1;

  pagedisplay.textContent = pagenumber;
});

async function topManga() {
  try {
    let page = pagedisplay;
    let data = await fetch(
      `https://api.jikan.moe/v4/top/manga?page=${page.innerHTML}`
    );
    let dataCon = await data.json();
    displayDataManga(dataCon);
  } catch (error) {
    console.log(error);
  }
}

function displayDataManga(datamanga) {
  let containerElm = document.getElementById('card__wrapper');
  let tes = document.getElementById('pagination__max');

  tes.innerHTML = datamanga.pagination.items.total;
  console.log(datamanga);

  datamanga.data.forEach(function (manga) {
    let mangaitem = document.createElement('div');
    mangaitem.innerHTML = cardShow(manga);
    containerElm.appendChild(mangaitem);
  });
}

topManga();
