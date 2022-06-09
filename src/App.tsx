import { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { spells } from "./spells";
import "./App.css";

function App() {
  const [spellName, setSpellName] = useState("");
  const [wandCount, setWandCount] = useState("");
  const [wandExpCalc, setWandExpCalc] = useState(0);
  const [wandGoldCalc, setWandGoldCalc] = useState(0);
  const [calcType, setCalcType] = useState("wand");

  function calculateCost() {
    const spell = spells.find((spell) => spell.name === spellName)!;

    const EXP_CALC_VALUE = calcType === "wand" ? 8 : 2;
    const GOLD_CALC_VALUE = calcType === "wand" ? 132 : 15;

    const wandExpCalc =
      spell.casterLevel *
      spell.innateLevel *
      EXP_CALC_VALUE *
      Number(wandCount);
    const wandGoldCalc =
      spell.casterLevel *
      spell.innateLevel *
      GOLD_CALC_VALUE *
      Number(wandCount);

    setWandExpCalc(wandExpCalc);
    setWandGoldCalc(wandGoldCalc);
  }

  return (
    <div className="App">
      <header className="logo">
        <img
          src="/wandpot mania.png"
          width="auto"
          height="270px"
          alt="Wandpot Mania's Logo, displaying the title and the image of a shiny red potion flask"
        />
      </header>

      <main className="flex-col">
        <section className="content">
          <div className="fields">
            <div className="flex-col spellPicker">
              <label htmlFor="spellList">Select your spell:</label>
              <select
                id="spellList"
                value={spellName}
                onChange={(event) => setSpellName(event.target.value)}
              >
                <option value="" disabled>
                  Select...
                </option>
                {spells.map(({ name, innateLevel }) =>
                  calcType === "wand" && innateLevel > 0 ? (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ) : (
                    calcType === "pot" &&
                    innateLevel > 0 &&
                    innateLevel < 4 && (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    )
                  )
                )}
              </select>
            </div>

            <div className="flex-col width-100 wandCounter">
              <label htmlFor="wandCount">
                Number of {calcType === "wand" ? "Wands" : "Pots"}:
              </label>
              <input
                type="number"
                name="Wand Number"
                id="wandCount"
                max="99"
                min="1"
                value={wandCount}
                onChange={(event) => setWandCount(event.target.value)}
              />
            </div>
          </div>

          <div className="radioMenu">
            <p>Select calc type:</p>
            <RadioGroup.Root
              defaultValue="wand"
              aria-label="Choose calc type"
              onValueChange={(value) => setCalcType(value)}
            >
              <div className="flex">
                <RadioGroup.Item value="wand" id="wand" className="radio">
                  <RadioGroup.Indicator className="indicator" />
                </RadioGroup.Item>
                <label htmlFor="wand">Wand</label>
              </div>
              <div className="flex">
                <RadioGroup.Item value="pot" id="pot" className="radio">
                  <RadioGroup.Indicator className="indicator" />
                </RadioGroup.Item>
                <label htmlFor="pot">Pot</label>
              </div>
            </RadioGroup.Root>
          </div>

          <button className="applyButton" onClick={calculateCost}>
            <strong>Calculate</strong>
          </button>
        </section>

        <section className="resultsContainer">
          <div className="result">
            <strong>XP Cost:</strong>
            <p id="wandExpCost">{wandExpCalc}</p>
          </div>
          <div className="result">
            <strong>Gold Cost:</strong>
            <p id="wandGoldCost">{wandGoldCalc}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
