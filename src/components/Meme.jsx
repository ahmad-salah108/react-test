import React from "react";

export default function () {
  const [allMemes, setAllMemes] = React.useState({});
  const [memeImage, setMemeImage] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  function getMemeImage() {
    const random = Math.floor(Math.random() * allMemes.data.memes.length);
    const randomUrl = allMemes.data.memes[random].url;
    setMemeImage((prevMemeImage) => ({
      ...prevMemeImage,
      randomImage: randomUrl,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMemeImage((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  React.useEffect(() => {
    async function myf() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      const random = Math.floor(Math.random() * data.data.memes.length);
      const randomUrl = data.data.memes[random].url;
      setMemeImage((prevMemeImage) => ({
        ...prevMemeImage,
        randomImage: randomUrl,
      }));
      console.log('asd')
      await setAllMemes(data);
    }
    myf();
  }, []);

  return (
    <section className="meme-section">
      <div className="meme-form">
        <input
          type="text"
          name="topText"
          id="topText"
          placeholder="Top text"
          onChange={handleChange}
          value={memeImage.topText}
        />
        <input
          type="text"
          name="bottomText"
          id="bottomText"
          placeholder="Bottom text"
          onChange={handleChange}
          value={memeImage.bottomText}
        />
        <button onClick={getMemeImage}>Get a new meme image</button>
        <div className="meme">
          <img src={memeImage.randomImage} className="meme--image" />
          <h2 className="meme--text top">{memeImage.topText}</h2>
          <h2 className="meme--text bottom">{memeImage.bottomText}</h2>
        </div>
      </div>
    </section>
  );
}
