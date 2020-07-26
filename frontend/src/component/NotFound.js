import React, { Component } from 'react';

class NotFound extends Component {
    state = { 

     }
    render() { 
        return (
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Halaman yang dicari tidak dapat ditemukan</h2>
                    <p>Maaf, halaman yang ingin anda akses telah dihapus atau diubah atau tidak tersedia sekarang</p>
                    <a href="/">Halaman utama</a>
                </div>
            </div>
         );
    }
}
 
export default NotFound;