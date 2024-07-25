
const brainRegions = {
    frontal: {
      name: "Frontal Lobe",
      keywords: [
        "Logic",
        "Math",
        "Calculating",
        "Decision-Making",
        "Planning",
      ].map(kw => kw.toLowerCase()),
      tasks: [],
    },
    parietal: {
      name: "Parietal Lobe",
      keywords: ["Sensory", "Spatial", "Navigation", "Touch", "Pain"].map(kw => kw.toLowerCase()),
      tasks: [],
    },
    temporal: {
      name: "Temporal Lobe",
      keywords: [
        "Memory",
        "Auditory",
        "Language",
        "Emotion",
        "Recognition",
      ].map(kw => kw.toLowerCase()),
      tasks: [],
    },
    occipital: {
      name: "Occipital Lobe",
      keywords: ["Vision", "Visual Processing", "Color Recognition"].map(kw => kw.toLowerCase()),
      tasks: [],
    },
    cerebellum: {
      name: "Cerebellum",
      keywords: [
        "Motor Control",
        "Balance",
        "Coordination",
        "Fine Motor Skills",
      ].map(kw => kw.toLowerCase()),
      tasks: [],
    },
  }
  document.getElementById("taskForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const task = document.getElementById("task").value;
      const keywords = document
        .getElementById("keywords")
        .value.split(",")
        .map((kw) => kw.trim());

      let region = null;
      for (const [key, value] of Object.entries(brainRegions)) {
        if (value.keywords.some((kw) => keywords.includes(kw))) {
          region = key;
          break;
        }
      }

      if (region) {
        brainRegions[region].tasks.push({task, keywords, completed: false});
        alert(`Task added to ${brainRegions[region].name}`);
        updateTaskList();
      } else {
        alert("No matching brain region found for the provided keywords.");
      }

      this.reset();
    });

  function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    for (const [region, data] of Object.entries(brainRegions)) {
      data.tasks = data.tasks.filter((task) => !task.completed);
      if (data.tasks.length > 0) {
        const regionHeader = document.createElement("h3");
        regionHeader.textContent = data.name;
        taskList.appendChild(regionHeader);
        data.tasks.forEach((task, index) => {
          const taskItem = document.createElement("div");
          taskItem.classList.add("task-item");
          taskItem.innerHTML = `
                    <input type="checkbox" id="${region}-${index}" ${task.completed ? 'checked' : ''}>
                    <label for="${region}-${index}" ${task.completed ? 'class="completed-task"' : ''}>${task.task}</label>
                  `;
          const checkbox = taskItem.querySelector('input[type="checkbox"]');
          checkbox.addEventListener('change', (e) => {
            task.completed = e.target.checked;
            updateTaskList();
          });
          taskList.appendChild(taskItem);
        });
      }
    }

  document.querySelectorAll("area").forEach((region) => {
    region.addEventListener("mouseenter", function (e) {
      const regionData = brainRegions[this.dataset.region];
      const tooltip = document.getElementById("tooltip");
      const activeTasks = regionData.tasks.filter(task => !task.completed);
      tooltip.innerHTML = `<strong>${regionData.name}</strong><br>
                Keywords: ${regionData.keywords.join(", ")}<br>
                Active Tasks: ${activeTasks.map((t) => t.task).join(", ") || "None"}`;

      positionTooltip(e, tooltip);
      tooltip.style.display = "block";
    });

    region.addEventListener("mouseleave", function () {
      document.getElementById("tooltip").style.display = "none";
    });

    region.addEventListener("mousemove", function (e) {
      positionTooltip(e, document.getElementById("tooltip"));
    });
  });

  function positionTooltip(e, tooltip) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    let left = e.clientX + 10;
    let top = e.clientY + 10;

    if (left + tooltipWidth > viewportWidth) {
      left = e.clientX - tooltipWidth - 10;
    }

    if (top + tooltipHeight > viewportHeight) {
      top = e.clientY - tooltipHeight - 10;
    }

    left = Math.max(0, left);
    top = Math.max(0, top);

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;}
  }
updateTaskList();
