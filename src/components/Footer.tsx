import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">About the Board</Link></li>
              <li><Link to="/vision" className="hover:underline">Vision & Mission</Link></li>
              <li><Link to="/organization" className="hover:underline">Organization Structure</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/projects" className="hover:underline">Projects</Link></li>
              <li><Link to="/tenders" className="hover:underline">Tenders</Link></li>
              <li><Link to="/reports" className="hover:underline">Reports</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
              <li><Link to="/accessibility" className="hover:underline">Accessibility</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Brahmaputra Board</li>
              <li>Guwahati, Assam</li>
              <li>Email: info@brahmaputra.gov.in</li>
              <li>Phone: +91-XXXX-XXXXXX</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Brahmaputra Board. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-80">Content Owned, Maintained and Updated by Brahmaputra Board</p>
        </div>
      </div>
    </footer>
  );
};
