import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './css/GameRule.css';
import PC_Rule from "./pages/PC_Rule";
import MOBILE_Rule from "./MOBILE_Rule";

export default function GameRule() {
  return (
    <div class="box">
        <div class="content-box">
            <div class="btn1">
                <button type="button" class="pc" onclick="location.href='pc.html'">PC</button>
            </div>
            <div class="btn2">
                <button type="button" class="mobile" onclick="location.href='mobile.html'">MOBILE</button>
            </div>
        </div>
    </div>
  );
}


