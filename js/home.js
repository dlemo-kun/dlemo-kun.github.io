const articles = []

function createConstArticles(a) {
    for (let i = 0; i < a; i++) {
        articles.push(`article-${(i+1).toString().padStart(4, '0')}.html`)
    }
}

createConstArticles(9);

const latestArticle = articles.reduce((max, article) => {
  const num = parseInt(article.match(/(\d+)/)[0], 10);
  return num > max ? num : max;
}, 0);

const latestArticleFile = `article-${latestArticle.toString().padStart(4, '0')}.html`; 

const filteredArticles = articles.filter(article => article !== latestArticleFile);

const shuffled = articles.sort(() => 0.5 - Math.random());
const randomArticles = shuffled.slice(0, 4);

async function loadArticles() {
  const articleList = [latestArticleFile, ...randomArticles];

  for (let i = 0; i < articleList.length; i++) {
    const article = articleList[i];
    const articleContainer = document.getElementById(`article-container-${i + 1}`); // Asigna contenedor numerado

    if (articleContainer) {
      try {
        const response = await fetch(`/dlemo-kun/articles/${article}`);
        const content = await response.text();
        articleContainer.innerHTML = content; // Reemplaza el contenido del contenedor
      } catch (error) {
        console.error('Error loading article:', error);
      }
    } else {
      console.error(`No se encontró el contenedor: article-container-${i + 1}`);
    }
  }
}

loadArticles();


