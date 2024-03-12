import styled from 'styled-components';
import Carousel from '../components/Carousel';
import Image from 'next/image';
import blogItems from '/content/blogItems';
import aboutUs from '/content/aboutUs';

const IndexStyles = styled.div`
  .hero-container{
    position: relative;
    width: 100vw;
  }
  .hero-image {
    height: calc(100vh - var(--header-height));
    width: 100vw;
    object-fit: cover;
    margin-top: var(--header-height);
  }
  .logo {
    position: absolute;
    top: 3%; 
    left: 50%;
    width: 8vw;
    aspect-ratio: 1/1;
    transform: translate(-50%, -50%);
  }
  .coming-soon {
    position: absolute;
    top: 50%; 
    left: 25%; 
    width: 50vw;
    transform: translate(-50%, -50%); 
    text-align: center;
    color: white;
    font-size: 4rem;
    font-weight: bold;
    font-family: var(--coming-soon-font);
    font-style:italic;
  }
  .tag-line {
    position: absolute;
    top: 75%; 
    left: 75%;
    transform: translate(-50%, -50%); 
    text-align: center;
    color: white;
    font-size: 4rem;
    font-weight: bold;
  }
  .blog-post {
    width: 30vh;
    min-width: 200px;
    margin-left: 1vw;
    position: relative;
  }
  .blog-text {
    color: white;
    line-height: 1;
    position: absolute;
    text-align: center;
    top: 5%; 
    left: 50%; 
    transform: translate(-50%, -50%);
  }
  .blog-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    aspect-ratio: 1/1;
  }
  .page-spacing {
    margin-top: -15px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    gap: var(--space-between-components);
  }
  .background-dark {
    width: 100vw;
    background-color: var(--dark-dusk);
    color: white;
    padding: 150px 0px 150px 0px;
  }

  .about-us-wrapper {
    width: 100vw;
    display: grid;
    justify-content: start;
    grid-template-areas: "image-left text image-right";
  }

  .about-us-middle {
    justify-self: center;
    grid-area: text;
    width: 50%;
  }

  .side-image {
    width: 20vw;
    padding: 0px 40px 0px 40px;
    object-fit: cover;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }

  .side-image-left{
    width: 25vw;
    align-self: center;
    grid-area: image-left;
  }

  .side-image-right{
    width: 25vw;
    align-self:center;
    grid-area: image-right;
  }

  .side-image-caption{
    text-align: center;
  }

  .about-us-title{
    font-style: italic;
    padding: 0px 20px 0px 20px;
    text-align: center;
  }

  .about-us-text {
    text-align:center;
    padding: 20px 0px 40px 0px;
  }

  @media ( max-width: 500px ) {
    .coming-soon {
      font-size: 5rem;
    }

    .about-us-wrapper {
      justify-items: center;
      row-gap: 20px;
      grid-template-areas: 
      "image-left"
      "image-right"
      "text";
    }

    .side-image-left {
        grid-row: 1; /* Top position */
        width: auto;
    }

    .side-image-right {
        grid-row: 2; /* Middle position */
        width: auto;
    }

    .about-us-text {
        width: 100%;
        grid-row: 3; /* Bottom position */
    }

    .side-image {
      padding: 0px;
      width: 50vw;
    }
  }

`;

export default function IndexPage() {

  function renderSideImage(image, caption, side) {
    if (image) {
      return (
        <div className={"side-image-" + side}>
          <img className="side-image" src={image} alt={caption}></img>
          <div className="side-image-caption">{caption}</div>
        </div>)
    }
  }

  return (
    <IndexStyles>
      <div className="hero-container">
        <img
          className="hero-image"
          src="/static/chan's_back.webp"
          alt="Climbing at Red Rocks"
        />
        <div className="coming-soon">
          Get<br />
          Women<br />
          to<br />
          the<br />
          Top
        </div>
      </div>

      <div className="page-spacing">

        {aboutUs.map((section, i) => (
          <div key={i} className={i % 2 == 1 ? "background-dark" : ""}>

            <h1 className="about-us-title" > {section.label}</h1>
            <div className="about-us-wrapper">
              {renderSideImage(section.imageLeft, section.captionLeft, "left")}
              <div className="about-us-middle">
                <div className="about-us-text">{section.content.split('\n').map((line, index, array) => (
                  <div key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </div>
                ))}</div>
              </div>
              {renderSideImage(section.imageRight, section.captionRight, "right")}
            </div>
          </div>
        ))
        }

        <Carousel title="Chan's Managment Blog">
          {blogItems.map((post, i) => (
            <div className="blog-post" key={i}>
              <h3 className="blog-text">{post.title}</h3>
              <Image width="500" height="500" quality={100} className="blog-image" alt={post.altText} src={post.image} />
            </div>
          ))}
        </Carousel>
      </div >
    </IndexStyles >
  );
}
