import Header from 'components/Header';
import Images from 'constants/images';
import React from 'react';
import './Home.scss';

const Home = () => {
  return (
    <div className='welcome-page'>
      <Header />

      <section className='my-team'>
        <h1 className='my-team-title'>
          Welcome to <br /> my team
        </h1>
        <p className='my-team-description'>
          We are a team gathered to do a fun project in the CMU-CS 447 JIS
          subject by lecturer Nguyen Chien Thang
        </p>
        <p className='my-team-latest'>
          Our latest project is <span>NoteMine</span>
        </p>

        <div className='line-text'>
          <span>Team</span>
        </div>

        <div className='my-team-inner'>
          <div className='my-team-person'>
            <img className='person-avatar' src={Images.CIRO_AVT} alt='' />

            <div className='person-info'>
              <p className='person-name'>Tran Kim Chan</p>
              <p className='person-position'>Leader</p>
            </div>
          </div>

          <div className='my-team-person'>
            <img className='person-avatar' src={Images.DAMIEN_AVT} alt='' />

            <div className='person-info'>
              <p className='person-name'>Nguyen Ngoc Ny</p>
              <p className='person-position'>Member</p>
            </div>
          </div>

          <div className='my-team-person'>
            <img
              className='person-avatar'
              src={Images.NICOLA_GHOST_AVT}
              alt=''
            />

            <div className='person-info'>
              <p className='person-name'>Do Duc Trung</p>
              <p className='person-position'>Member</p>
            </div>
          </div>

          <div className='my-team-person'>
            <img className='person-avatar' src={Images.NIAL_AVT} alt='' />

            <div className='person-info'>
              <p className='person-name'>Le Nhu Hieu</p>
              <p className='person-position'>Member</p>
            </div>
          </div>
        </div>

        <div className='line-text'>
          <span>Contact</span>
        </div>

        <p className='my-team-contact'>
          We’d love to hear from you.{' '}
          <a href='mailto:notemine@gmail.com'>Get in touch</a>
        </p>

        <p className='my-team-copyright'>© Note Mine</p>
      </section>
    </div>
  );
};

export default Home;
