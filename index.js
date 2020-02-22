class ResizableWindow {
  constructor(props) {
    this.parent = props.parent;
    this.component = null;
    this.resizableMargin = 15;
    this.width = 300;
    this.height = 300;
    this.isResizable = false;
    this.resizeFrom = null;
    this.x = props.x;
    this.y = props.y;
    this.initialX = null;
    this.initialY = null;
    this.initialMouseX = null;
    this.initialMouseY = null;
    this.initialWidth = null;
    this.initialHeight = null;
  }

  createComponent = () => {
    const component = document.createElement("div");
    component.style.width = `${this.width}px`;
    component.style.height = `${this.height}px`;
    component.style.left = `${this.x}px`;
    component.style.top = `${this.y}px`;
    component.classList.add("pane");
    this.component = component;
    this.attachEventListeners();
    document.querySelector(this.parent).appendChild(this.component);
  };

  attachEventListeners = () => {
    this.component.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
  };

  onMouseDown = e => {
    e.preventDefault();
    this.checkIfResizableArea(e);
  };

  checkIfResizableArea = e => {
    if (e.offsetX > this.width - this.resizableMargin) {
      this.isResizable = true;
      this.resizeFrom = "right";
    } else if (e.offsetX < this.resizableMargin) {
      this.isResizable = true;
      this.resizeFrom = "left";
    } else if (e.offsetY > this.height - this.resizableMargin) {
      this.isResizable = true;
      this.resizeFrom = "bottom";
    } else if (e.offsetY < this.resizableMargin) {
      this.isResizable = true;
      this.resizeFrom = "top";
    }
    this.initialMouseX = e.pageX;
    this.initialMouseY = e.pageY;
    this.initialX = this.x;
    this.initialY = this.y;
    this.initialWidth = this.width;
    this.initialHeight = this.height;
  };

  onMouseUp = () => {
    this.isResizable = false;
    this.resizeFrom = null;
    this.initialMouseX = null;
    this.initialMouseY = null;
  };

  onMouseMove = e => {
    if (this.isResizable) {
      this.updateWidth(e);
    }
  };

  updateWidth = e => {
    if (this.resizeFrom === "right") {
      this.width = e.pageX - this.component.getBoundingClientRect().left;
      this.component.style.width = `${this.width}px`;
    } else if (this.resizeFrom === "left") {
      this.x = this.initialX + (e.pageX - this.initialMouseX);
      this.component.style.left = `${this.x}px`;
      this.width = this.initialWidth - (e.pageX - this.initialMouseX);
      this.component.style.width = `${this.width}px`;
    } else if (this.resizeFrom === "bottom") {
      this.height = e.pageY - this.component.getBoundingClientRect().top;
      this.component.style.height = `${this.height}px`;
    } else if (this.resizeFrom === "top") {
      this.y = this.initialY + (e.pageY - this.initialMouseY);
      this.component.style.top = `${this.y}px`;
      this.height = this.initialHeight - (e.pageY - this.initialMouseY);
      this.component.style.height = `${this.height}px`;
    }
  };
}

const resizable = new ResizableWindow({
  parent: "body",
  x: 200,
  y: 200
}).createComponent();
