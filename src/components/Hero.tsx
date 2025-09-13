import React from 'react';
import { ArrowRight, Play, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-20 overflow-hidden" style={{
      backgroundImage: "url('https://ik.imagekit.io/fdd16n9cy/di.png?updatedAt=1757770843990')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Sun Animation */}
      <div className="relative mb-8">
        <div className="section-banner-sun">
          <div id="star-1">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>

          <div id="star-2">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>

          <div id="star-3">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>

          <div id="star-4">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>

          <div id="star-5">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>

          <div id="star-6">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>

          <div id="star-7">
            <div className="curved-corner-star">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
            </div>
            <div className="curved-corner-star">
              <div id="curved-corner-topright"></div>
              <div id="curved-corner-topleft"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Text - Below Animation */}
      <div className="hero-text relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{
          color: '#E8F0FF',
          textShadow: '2px 2px 12px #2B448C'
        }}>
          Accelerate your career with ai-powered growth
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{
          color: '#dbeaff',
          textShadow: '1px 1px 8px #2B448C'
        }}>
          Unify your job search, personal branding, and skill development in one intelligent platform. Career Clarified helps you land better opportunities faster.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => navigate('/signup')}
            className="hero-button primary px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2"
            style={{
              color: '#E8F0FF',
              background: 'linear-gradient(145deg, #516395, #44547e)',
              boxShadow: '7px 7px 15px #273049, -7px -7px 15px #6b84c5'
            }}
          >
            Get started
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button 
            className="hero-button secondary px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2"
            style={{
              color: '#E8F0FF',
              background: 'linear-gradient(145deg, #516395, #44547e)',
              boxShadow: '7px 7px 15px #273049, -7px -7px 15px #6b84c5'
            }}
          >
            <Play className="w-5 h-5" />
            Learn more
          </button>
        </div>

        {/* Trust Indicator */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-2 text-white/80 mb-6">
            <Users className="w-5 h-5" />
            <span className="font-medium">Join 10,000+ professionals who landed better roles and built stronger brands</span>
          </div>
          
          {/* Company Logos */}
          <div className="flex items-center justify-center gap-8 opacity-80">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg shadow-sm border border-white/20 text-white font-semibold">Google</div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg shadow-sm border border-white/20 text-white font-semibold">Microsoft</div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg shadow-sm border border-white/20 text-white font-semibold">Amazon</div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg shadow-sm border border-white/20 text-white font-semibold">Meta</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-banner-sun {
          height: 300px;
          width: 300px;
          position: relative;
          transition: left 0.3s linear;
          background-color: #E6E6FA;
          border-radius: 50%;
          animation: shadowPulse 5s ease-in-out infinite;
          box-shadow:
            0px 0px 40px 20px #7891D5,
            -5px 0px 10px 1px #E8F0FF inset,
            15px 2px 40px 20px #4D69B4c5 inset,
            -24px -2px 50px 25px #7891D5c2 inset,
            150px 0px 80px 35px #2B448Caa inset;
        }

        .curved-corner-star {
          display: flex;
          position: relative;
        }

        #curved-corner-bottomleft,
        #curved-corner-bottomright,
        #curved-corner-topleft,
        #curved-corner-topright {
          width: 4px;
          height: 5px;
          overflow: hidden;
          position: relative;
        }

        #curved-corner-bottomleft:before,
        #curved-corner-bottomright:before,
        #curved-corner-topleft:before,
        #curved-corner-topright:before {
          content: "";
          display: block;
          width: 200%;
          height: 200%;
          position: absolute;
          border-radius: 50%;
        }

        #curved-corner-bottomleft:before {
          bottom: 0;
          left: 0;
          box-shadow: -5px 5px 0 0 #E8F0FF;
        }

        #curved-corner-bottomright:before {
          bottom: 0;
          right: 0;
          box-shadow: 5px 5px 0 0 #E8F0FF;
        }

        #curved-corner-topleft:before {
          top: 0;
          left: 0;
          box-shadow: -5px -5px 0 0 #E8F0FF;
        }

        #curved-corner-topright:before {
          top: 0;
          right: 0;
          box-shadow: 5px -5px 0 0 #E8F0FF;
        }

        @keyframes twinkling {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes shadowPulse {
          0%, 100% {
            box-shadow:
              0px 0px 40px 20px #7891D5,
              -5px 0px 10px 1px #E8F0FF inset,
              15px 2px 40px 20px #4D69B4c5 inset,
              -24px -2px 50px 25px #7891D5c2 inset,
              150px 0px 80px 35px #2B448Caa inset;
          }
          50% {
            box-shadow:
              0px 0px 60px 30px #AEBFE3,
              -5px 0px 20px 5px #E8F0FF inset,
              15px 2px 60px 30px #4D69B4c5 inset,
              -24px -2px 70px 35px #7891D5c2 inset,
              150px 0px 100px 45px #2B448Caa inset;
          }
        }

        #star-1 {
          position: absolute;
          left: -20px;
          animation: twinkling 3s infinite;
        }

        #star-2 {
          position: absolute;
          left: -40px;
          top: 30px;
          animation: twinkling 2s infinite;
        }

        #star-3 {
          position: absolute;
          left: 350px;
          top: 90px;
          animation: twinkling 4s infinite;
        }

        #star-4 {
          position: absolute;
          left: 200px;
          top: 290px;
          animation: twinkling 3s infinite;
        }

        #star-5 {
          position: absolute;
          left: 50px;
          top: 270px;
          animation: twinkling 1.5s infinite;
        }

        #star-6 {
          position: absolute;
          left: 250px;
          top: -50px;
          animation: twinkling 4s infinite;
        }

        #star-7 {
          position: absolute;
          left: 290px;
          top: 60px;
          animation: twinkling 2s infinite;
        }

        .hero-button:hover {
          box-shadow: 10px 10px 22px #273049, -10px -10px 22px #6b84c5 !important;
        }

        .hero-button:active {
          background: #4a5a86 !important;
          box-shadow: inset 7px 7px 15px #273049, inset -7px -7px 15px #6b84c5 !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;