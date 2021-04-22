window.onload = () => {
  const form = document.getElementById("form");
  const providerName = document.getElementById("providerName");
  const providerUrl = document.getElementById("providerUrl");
  const authorName = document.getElementById("authorName");
  const authorUrl = document.getElementById("authorUrl");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const type = document.getElementById("type");
  const image = document.getElementById("image");
  const color = document.getElementById("color");
  const response = document.getElementById("response");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const obj = {};
    if (providerName.value) obj.providerName = providerName.value;
    if (providerUrl.value) obj.providerUrl = providerUrl.value;
    if (authorName.value) obj.authorName = authorName.value;
    if (authorUrl.value) obj.authorUrl = authorUrl.value;
    if (title.value) obj.title = title.value;
    if (description.value) obj.description = description.value;
    if (type.value) obj.type = type.value;
    if (image.value) obj.image = image.value;
    if (color.value) obj.color = color.value.slice(1);

    const req = new XMLHttpRequest()
    req.open("POST", "/api/embeds/create")
    req.send({
      body: {
        access_token: "dfssdfsdasdfsd",
        guildID: "321534324",
        embed: obj
      }
    })
    req.onload = () => {
      console.log(req)
    }
  });
}