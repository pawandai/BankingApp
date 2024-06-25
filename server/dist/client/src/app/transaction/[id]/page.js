"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormSkeleton_1 = __importDefault(require("@/components/shared/FormSkeleton"));
const client_1 = require("@apollo/client");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const TransactionPage = () => {
    var _a, _b, _c, _d, _e, _f;
    const { id } = (0, navigation_1.useParams)();
    const { loading, data } = (0, client_1.useQuery)(GET_TRANSACTION, {
        variables: { id: id },
    });
    console.log("Transaction", data);
    const [updateTransaction, { loading: loadingUpdate }] = (0, client_1.useMutation)(UPDATE_TRANSACTION, {
        // https://github.com/apollographql/apollo-client/issues/5419 => refetchQueries is not working, and here is how we fixed it
        refetchQueries: [{ query: GET_TRANSACTION_STATISTICS }],
    });
    const [formData, setFormData] = (0, react_1.useState)({
        description: ((_a = data === null || data === void 0 ? void 0 : data.transaction) === null || _a === void 0 ? void 0 : _a.description) || "",
        paymentType: ((_b = data === null || data === void 0 ? void 0 : data.transaction) === null || _b === void 0 ? void 0 : _b.paymentType) || "",
        category: ((_c = data === null || data === void 0 ? void 0 : data.transaction) === null || _c === void 0 ? void 0 : _c.category) || "",
        amount: ((_d = data === null || data === void 0 ? void 0 : data.transaction) === null || _d === void 0 ? void 0 : _d.amount) || "",
        location: ((_e = data === null || data === void 0 ? void 0 : data.transaction) === null || _e === void 0 ? void 0 : _e.location) || "",
        date: ((_f = data === null || data === void 0 ? void 0 : data.transaction) === null || _f === void 0 ? void 0 : _f.date) || "",
    });
    // event type any for now
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const amount = parseFloat(formData.amount); // convert amount to number bc by default it is string
        // and the reason it's coming from an input field
        try {
            yield updateTransaction({
                variables: {
                    input: Object.assign(Object.assign({}, formData), { amount, transactionId: id }),
                },
            });
            react_hot_toast_1.default.success("Transaction updated successfully");
        }
        catch (error) {
            react_hot_toast_1.default.error("Something went wrong!");
        }
    });
    // event type any for now
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => (Object.assign(Object.assign({}, prevFormData), { [name]: value })));
    };
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d, _e;
        if (data) {
            setFormData({
                description: (_a = data === null || data === void 0 ? void 0 : data.transaction) === null || _a === void 0 ? void 0 : _a.description,
                paymentType: (_b = data === null || data === void 0 ? void 0 : data.transaction) === null || _b === void 0 ? void 0 : _b.paymentType,
                category: (_c = data === null || data === void 0 ? void 0 : data.transaction) === null || _c === void 0 ? void 0 : _c.category,
                amount: (_d = data === null || data === void 0 ? void 0 : data.transaction) === null || _d === void 0 ? void 0 : _d.amount,
                location: (_e = data === null || data === void 0 ? void 0 : data.transaction) === null || _e === void 0 ? void 0 : _e.location,
                date: new Date(+data.transaction.date).toISOString().substr(0, 10),
            });
        }
    }, [data]);
    if (loading)
        return <FormSkeleton_1.default />;
    return (<div className="h-screen max-w-4xl mx-auto flex flex-col items-center">
      <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
        Update this transaction
      </p>
      <form className="w-full max-w-lg flex flex-col gap-5 px-3 " onSubmit={handleSubmit}>
        {/* TRANSACTION */}
        <div className="flex flex-wrap">
          <div className="w-full">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="description">
              Transaction
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" name="description" type="text" placeholder="Rent, Groceries, Salary, etc." value={formData.description} onChange={handleInputChange}/>
          </div>
        </div>
        {/* PAYMENT TYPE */}
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="paymentType">
              Payment Type
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="paymentType" name="paymentType" onChange={handleInputChange} defaultValue={formData.paymentType}>
                <option value={"card"}>Card</option>
                <option value={"cash"}>Cash</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="category">
              Category
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="category" name="category" onChange={handleInputChange} defaultValue={formData.category}>
                <option value={"saving"}>Saving</option>
                <option value={"expense"}>Expense</option>
                <option value={"investment"}>Investment</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label className="block uppercase text-white text-xs font-bold mb-2" htmlFor="amount">
              Amount($)
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="amount" name="amount" type="number" placeholder="150" value={formData.amount} onChange={handleInputChange}/>
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="location" name="location" type="text" placeholder="New York" value={formData.location} onChange={handleInputChange}/>
          </div>

          {/* DATE */}
          <div className="w-full flex-1">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input type="date" name="date" id="date" className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white" placeholder="Select date" value={formData.date} onChange={handleInputChange}/>
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <button className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600" type="submit" disabled={loadingUpdate}>
          {loadingUpdate ? "Updating..." : "Update Transaction"}
        </button>
      </form>
    </div>);
};
exports.default = TransactionPage;
