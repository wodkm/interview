#

## 1000-div问题

* 一次性插入1000个div，如何优化插入的性能-使用Fragment

 ```javascript
    var fragment = document.createDocumentFragment();
    fragment.appendChild(elem);
 ```
