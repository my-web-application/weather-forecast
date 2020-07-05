import React, { Component } from 'react';
import '../assets/css/index.css';

import Getlocation from '../Components/Getlocation/getlocation';

class Layout extends Component{
   render() {
      return (
         <div>
            <div className="container">
               <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-8">
                     <div className="main_content">
						      <div className="details">
                           <Getlocation />
                        </div>
                     </div>
                  </div>
               </div>
				   <div className="col-md-2"></div>
			   </div>
		   </div>
      );
   }
}

export default Layout;