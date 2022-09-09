import React from 'react';
import balon from './balon.jpg';
import tenis from './tenis.jpg';
import paddle from './paddle.jpg';

class Tarifas extends React.Component {

  render() {

    return (
      <div className="container">
        <h1 className="display-3 mt-5 mb-3">Tarifas</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm" >
                <img className="center2" src={balon} alt="Futbol" height="25%" />
                <div className="card-body">
                  <h1>Futbol 5</h1>
                  <h3>Alquiler de cancha</h3>
                  <h5> Lunes a viernes <p><mark>$450</mark></p></h5>
                  <h5> Sábados, domingos y feriados <p><mark>$500</mark></p></h5>
                  <h3>Clases individuales</h3>
                  <h5> Lunes a viernes <p><mark>$600</mark></p></h5>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 shadow-sm" >
                <img className="center2" src={tenis} alt="Club1" height="25%" />
                <div className="card-body">
                  <h1>Tenis</h1>
                  <h3>Alquiler de cancha</h3>
                  <h5> Lunes a viernes <p><mark>$150</mark></p></h5>
                  <h5> Sábados, domingos y feriados <p><mark>$170</mark></p></h5>
                  <h3>Clases individuales</h3>
                  <h5> Lunes a viernes <p><mark>$300</mark></p></h5>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 shadow-sm" >
                <img className="center2" src={paddle} alt="Club1" height="25%" />
                <div className="card-body">
                  <h1>Padel</h1>
                  <h3>Alquiler de cancha</h3>
                  <h5> Lunes a viernes <p><mark>$130</mark></p></h5>
                  <h5> Sábados, domingos y feriados <p><mark>$140</mark></p></h5>
                  <h3>Clases individuales</h3>
                  <h5> Lunes a viernes <p><mark>$260</mark></p></h5>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Tarifas;