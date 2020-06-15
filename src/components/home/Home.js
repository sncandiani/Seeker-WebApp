import React from "react"
import Carousel from 'react-bootstrap/Carousel'

const Home = (props) => {
    
    return (
        <>
        <section className="home">
            <div className="motto">
                <p>Your job hunt, <br></br>on your terms.</p>
            </div>
            <div className="carousel">
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2016%2F09%2F05-when-questions-never-ask-job-interview-zoranm.jpg&f=1&nofb=1"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Network</h3>
      <p>Track companies and their employees.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F970x450%2Fworking-on-laptop-1940x900_36206.jpg&f=1&nofb=1"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Interviews</h3>
      <p>Interview note taking, simplified.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.theconversation.com%2Ffiles%2F182840%2Foriginal%2Ffile-20170821-28104-7rodu7.jpg%3Fixlib%3Drb-1.1.0%26q%3D45%26auto%3Dformat%26w%3D926%26fit%3Dclip&f=1&nofb=1"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Applications</h3>
      <p>Track applications you've submitted with ease.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
            </div>
        </section>
        </>
    )

}
export default Home