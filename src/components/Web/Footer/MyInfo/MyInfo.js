import React from 'react'
import LogoChNat from '../../../../assets/img/png/LogoChNat.png'
import SocialLinks from '../../SocialLinks';

import './MyInfo.scss';

export default function MyInfo() {
    return (
        <div className="my-info">
            <img src={LogoChNat} alt="Chechunat" />
            <h4>Entra en el desarrollo web y disfruta creando proyectos que sorprendan al mundo entero...</h4>
            <SocialLinks/>
        </div>
    )
}
