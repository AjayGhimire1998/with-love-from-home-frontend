

export const handleReadMore = () => {
    const hiddenParagraph = document.getElementById("hidden-paragraph")
    const readMore = document.querySelector(".read-more")
    hiddenParagraph.style.display = 'block'
    readMore.style.display = 'none'
}
