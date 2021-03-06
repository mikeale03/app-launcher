Vue.directive('drag-n-sort',
  function(el, binding) {
    let setDragNsort = function() {
      el.ondrop = function(ev) {
        let group = ev.dataTransfer.getData("group");
        console.log(group);
        if(binding.value.group == group) {
          ev.preventDefault();
          let dropIndex = ev.dataTransfer.getData("text");
          let selfIndex = this.dataset.index;
          let copy = binding.value.list[dropIndex];
          binding.value.list.splice(dropIndex,1);
          binding.value.list.splice(selfIndex,0,copy);
        }
      }
      el.ondragover = function(ev) {
        ev.preventDefault();
      }
      el.ondragstart = function(ev) {
        let index = ev.target.getAttribute("data-index");
        ev.dataTransfer.setData("text", index);
        ev.dataTransfer.setData("group", binding.value.group);
        ev.target.setAttribute("contenteditable", "false");
        ev.currentTarget.focus();
      }
      //el.setAttribute("draggable", "true");
    }

    el.setAttribute("data-index", binding.value.index);
    if(binding.value.hasOwnProperty("exclude")) {
      if(el.dataset.index != binding.value.exclude) {
        setDragNsort();
      } else {
        el.setAttribute('draggable', 'false');
        el.ondrop = function(ev) {
          return false;
        }
      }
    } else {
      setDragNsort();
    }
  
});
