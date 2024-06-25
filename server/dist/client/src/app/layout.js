"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const google_1 = require("next/font/google");
require("./globals.css");
const urbanist = (0, google_1.Urbanist)({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});
exports.metadata = {
    title: "Banking App",
    description: "Created by pawandai",
};
function RootLayout({ children, }) {
    return (<html lang="en">
      <body className={`${urbanist.className} font-medium`}>{children}</body>
    </html>);
}
