'use client';
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ParentDashboard;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var react_chartjs_2_1 = require("react-chartjs-2");
var chart_js_1 = require("chart.js");
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.BarElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend);
function ParentDashboard() {
    var _this = this;
    var _a = (0, react_1.useState)({
        labels: [],
        datasets: [
            {
                label: 'Daily Screen Time',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    }), screenTimeData = _a[0], setScreenTimeData = _a[1];
    var _b = (0, react_1.useState)({
        labels: ['Education', 'Entertainment', 'Social', 'Other'],
        datasets: [
            {
                label: 'Screen Time by Category',
                data: [0, 0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
            },
        ],
    }), categoryData = _b[0], setCategoryData = _b[1];
    var _c = (0, react_1.useState)([]), suggestions = _c[0], setSuggestions = _c[1];
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var screenTimeResponse, screenTimeData, categoryResponse, categoryData, suggestionsResponse, suggestionsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/api/screen-time')];
                    case 1:
                        screenTimeResponse = _a.sent();
                        return [4 /*yield*/, screenTimeResponse.json()];
                    case 2:
                        screenTimeData = _a.sent();
                        setScreenTimeData(screenTimeData);
                        return [4 /*yield*/, fetch('/api/category-time')];
                    case 3:
                        categoryResponse = _a.sent();
                        return [4 /*yield*/, categoryResponse.json()];
                    case 4:
                        categoryData = _a.sent();
                        setCategoryData(categoryData);
                        return [4 /*yield*/, fetch('/api/ai-suggestions')];
                    case 5:
                        suggestionsResponse = _a.sent();
                        return [4 /*yield*/, suggestionsResponse.json()];
                    case 6:
                        suggestionsData = _a.sent();
                        setSuggestions(suggestionsData);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    return (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-purple-800 mb-8">Parent Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <framer_motion_1.motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Daily Screen Time</h2>
          <react_chartjs_2_1.Line data={screenTimeData}/>
        </framer_motion_1.motion.div>
        <framer_motion_1.motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Screen Time by Category</h2>
          <react_chartjs_2_1.Bar data={categoryData}/>
        </framer_motion_1.motion.div>
      </div>
      <framer_motion_1.motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">AI Suggestions</h2>
        <ul className="space-y-2">
          {suggestions.map(function (suggestion, index) { return (<framer_motion_1.motion.li key={index} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 + index * 0.1 }} className="flex items-center">
              <span className="text-purple-600 mr-2">•</span>
              {suggestion}
            </framer_motion_1.motion.li>); })}
        </ul>
      </framer_motion_1.motion.div>
    </framer_motion_1.motion.div>);
}
