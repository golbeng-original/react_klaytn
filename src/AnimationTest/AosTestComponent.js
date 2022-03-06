import React from 'react';
import AOS from 'aos'
import "aos/dist/aos.css"

// https://github.com/michalsnik/aos

export default class AosTestComponent extends React.Component {

    boxStyle = {
        width: '100%',
        height: '300px',
        background: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center'
      }
    
      childBoxStyle = {
        width: '100px',
        height: '100px',
        background: 'red',
        margin: 10,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }

      constructor(props) {
        super(props)

        this.once = props.once ? true : false

        AOS.init()
      }

      // data-aos-anchor 특정 element id, class 기점으로 애니메이션

      renderBoxies = () => {
        let arr = []
        for(let i = 0 ; i < 30 ; i++) {
          arr.push((
            <div key={i} style={this.boxStyle}>
              <div style={this.childBoxStyle} 
                data-aos='fade-up' 
                data-aos-duraction='600' 
                data-aos-once={this.once}
                >
                {`${i} - 0`}
              </div>
              <div style={this.childBoxStyle} 
              data-aos='fade-up' 
              data-aos-duraction='600' 
              data-aos-delay='200'
              data-aos-once={this.once}> 
                {`${i} - 1`}
              </div>
              <div style={this.childBoxStyle} 
              data-aos='fade-up' 
              data-aos-duraction='600' 
              data-aos-delay='400'
              data-aos-once={this.once}> 
                {`${i} - 2`}
              </div>
            </div>
          ))
        }
    
        return arr
      }

      render() {
          return (
              <React.Fragment>
                  {this.renderBoxies()}
              </React.Fragment>
          )
      }
}