async function generate() {
  const text = document.getElementById("input").value;
  const style = document.getElementById("style").value;
  const mode = document.getElementById("mode").value;
  const apiKey = document.getElementById("apikey").value;

  if (!text || !apiKey) {
    alert("请输入文本和API Key");
    return;
  }

  const prompt = `
你是漫画导演，请生成分镜：

风格：${style}
模式：${mode}

要求：
- 每个分镜独立
- 3:4画面
- 强化戏剧性

文本：
${text}
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: "gpt-5.5",
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await res.json();

  const output = data.choices[0].message.content;

  renderResult(output);
}

function renderResult(text) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  const parts = text.split("【分镜");

  parts.forEach(p => {
    if (!p.trim()) return;

    const div = document.createElement("div");
    div.className = "card";
    div.innerText = "【分镜" + p;

    const btn = document.createElement("button");
    btn.innerText = "复制";
    btn.onclick = () => navigator.clipboard.writeText(div.innerText);

    div.appendChild(document.createElement("br"));
    div.appendChild(btn);

    container.appendChild(div);
  });
}