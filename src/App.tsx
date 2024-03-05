import React, { useState } from "react";
import "./App.css";

interface Param {
  id: number;
  name: string;
  type: TypeParam;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}
enum TypeParam {
  String = "string",
  Number = "number",
}

interface Props {
  params: Param[];
  model: Model;
}

const Main: React.FC<Props> = ({ params, model }) => {
  const [item, setItem] = useState(model);
  const getModel = () => {
    console.log(item);
  };

  const changeParam = (value: string, id: number) => {
    const paramValues = item.paramValues;
    paramValues[id] = { paramId: item.paramValues.length, value: value };
    setItem((state) => ({ ...state, paramValues: paramValues }));
  };

  return (
    <div>
      {params.map((item, index) => (
        <div>
          <div>{item.name}</div>
          {item.type === TypeParam.String && (
            <input
              className="item"
              type="text"
              value={model.paramValues[index].value}
              onChange={(event) => changeParam(event.target.value, index)}
            />
          )}
          {item.type === TypeParam.Number && (
            <select
              className="item"
              onChange={(event) => changeParam(event.target.value, index)}
            >
              {["Мини", "Сред", "Макси"].map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button onClick={getModel}>Показать</button>
    </div>
  );
};

export default function App() {
  const params = [
    { id: 1, name: "Назначение", type: TypeParam.String },
    { id: 2, name: "Длина", type: TypeParam.Number },
  ];

  const model = {
    paramValues: [
      { paramId: 1, value: "Повседневное" },
      { paramId: 2, value: "Сред" },
    ],
  };
  return (
    <div className="App">
      <Main model={model} params={params} />
    </div>
  );
}
