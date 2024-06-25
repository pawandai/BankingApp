"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const react_1 = __importDefault(require("react"));
const NotFound = () => {
    return (<section>
      <div className=" text-white">
        <div className="flex h-screen">
          <div className="m-auto text-center">
            <div>
              <image_1.default src="/404.svg" alt="404" width={631} height={379}/>
            </div>
            <p className="text-sm md:text-base text-[#F6009B] p-2 mb-4">
              The page you were looking for does&apos;t exist
            </p>
            <a href="/" className="bg-transparent hover:bg-[#F6009B] text-[#F6009B] hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-[#F6009B] hover:border-transparent">
              Take me home
            </a>
          </div>
        </div>
      </div>
    </section>);
};
exports.default = NotFound;
