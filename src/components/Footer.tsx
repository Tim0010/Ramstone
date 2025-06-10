import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Ramstone Creative Solutions</h2>
                <p className="text-sm text-gray-300">Great Professionalism. Superb Quality.</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              We offer trusted car repair services and a wide range of general supply items, 
              based in Lusaka, Zambia. Serving our community with honesty, quality, and local support.
            </p>
            <div className="text-sm text-gray-300">
              <p>📍 23A Great East Road, Avondale, Lusaka</p>
              <p>📞 +260 974 622 334</p>
              <p>✉️ grayheavens891@gmail.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/auto-repair" className="text-gray-300 hover:text-primary transition-colors">Auto Repair</Link></li>
              <li><Link to="/general-supply" className="text-gray-300 hover:text-primary transition-colors">General Supply</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Panel Beating</li>
              <li>Spray Painting</li>
              <li>Auto Spares</li>
              <li>Stationery</li>
              <li>Hardware Tools</li>
              <li>Electrical Equipment</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              © 2025 Ramstone Creative Solutions. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-300">Business Hours:</span>
              <span className="text-sm text-gray-300">Mon-Fri 8AM-6PM, Sat 8AM-4PM</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
