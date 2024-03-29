# grid 布局

和 flex 布局有一定的相似性，但 flex 布局更多的是一种一维布局，围绕着轴线进行布局。grid 布局则会将容器划分为行和列，意味着存在多根轴线，是一种二维布局。

## 1 基本概念

- 容器
- 网格线
- 行和列
- 单元格
- 项目

## 2 容器属性

### 2.1 display 属性

- grid： 定义为网格容器，该容器为块级元素
- inline-grid： 定义为网格容器，该容器为行内元素

### 2.2 grid-template-columns 属性

grid-template-rows 属性一样，用法 用 grid-template-columns 举例

grid-template-columns 属性定义每一列的列宽

```css
grid-template-columns: 100px 100px;
```

上面代码指定了宽度为 100px 的两列

除了用绝对单位，也可以用百分比，参照系为自身属性。

#### 2.2.1 repeat() 函数

有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用 repeat()函数，简化重复的值。上面的代码可以这样写

```css
grid-template-columns: repeat(2, 100px);
```

repeat() 函数还可以重复某种模式，比如

```css
grid-template-columns: repeat(2, 100px 200px);
```

上面代码指定了 4 列，宽度分别为 100px 200px 100px 200px

#### 2.2.2 auto-fill 关键字

有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用 auto-fill 关键字表示自动填充。

```css
grid-template-columns: repeat(auto-fill, 100px 200px);
```

#### 2.2.3 fr 关键字

为了方便表示比例关系，网格布局提供了 fr 关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为 1fr 和 2fr，就表示后者是前者的两倍。

```css
grid-template-columns: 100px 1fr 2fr;
```

上面代码表示第一列为 100px 宽，剩下的空间，第二类占一份，第三列占两份

#### 2.2.4 minmax()函数

minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
grid-template-columns: 100px 1fr minmax(100px, 1fr);
```

#### 2.2.5 auto 关键字

auto 关键字表示由浏览器自己决定长度。

```css
grid-template-columns: 100px auto 200px;
```

#### 2.2.6 网格线名称

grid-template-columns 属性和 grid-template-rows 属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

```css
grid-template-columns: [c1] 100px [c2] 200px [c3];
```

用法:

```css
grid-auto-rows: 100px;
```

### 2.3 grid-gap 属性

属性设置行与行的间隔（行间距），列与列的间隔（列间距）。

- grid-gap: <grid-row-gap> <grid-column-gap>;
- grid-row-gap: <值>：属性设置行与行的间隔（行间距）
- grid-column-gap: <值>：属性设置列与列的间隔（列间距）

grid-gap 省略第二个值则默认第二个值跟第一个值一样。

根据最新标标准，上面三个属性 grid-前缀删除，因为这三个属性不单单只用于 gird 布局，在 flex 布局和多列布局中也是可以使用的。变为 gap row-gap column-gap。

例子

```css
gap: 10px 20px;
```

### 2.4 grid-template-areas

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas 属性用于定义区域。

```css
grid-template-columns: 100px 100px 100px;
grid-template-rows: 100px 100px 100px;
grid-template-areas: "a a ." "d e f" "g h i";
```

上面代码是线划分出 9 个单元格，然后第一第二单元格被命名为区域 a，第三单元格不需要利用则可以用 . 表示

区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end

### 2.5 grid-auto-flow 属性

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行

这个顺序由 grid-auto-flow 属性决定，默认值是 row，即"先行后列"。也可以将它设成 column，变成"先列后行"。

grid-auto-flow 属性除了设置成 row 和 column，还可以设成 row dense 和 column dense。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

row 和 row dense 的区别在于 row 或按照顺序来放置在每个网格，但 row dense 在顺序的基础上，如果剩下的空间不够放置下一个项目，则会看后面其他的项目适合不适合，适合的话会优先放置，不完全按照顺序来放置。

### 2.6 justify-items

讲三个属性

- justify-items: 属性设置单元格内容的水平位置（左中右）
- align-items: 属性设置单元格内容的垂直位置（上中下）。
- place-items: <align-items> <justify-items>;

参照系为单元格，设置项目的排列方式

属性值有下面几个：

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

### 2.7 justify-content

讲三个属性

- justify-content: 属性设置整个内容区域在容器里面的水平位置（左中右）
- align-content: 属性设置整个内容区域的垂直位置（上中下）。
- place-content: <align-content> <justify-content>;

参照系为容器，设置单元格的排列方式

属性值有下面几个：

- start：对齐容器的起始边框。
- end：对齐容器的结束边框。
- center：容器内部居中。
- stretch：项目大小没有指定时，拉伸占据整个网格容器。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
- space-between：项目与项目的间隔相等，项目与容器边框之间没有间隔。
- space-evenly：项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

### 2.8 grid-auto-columns

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有 3 列，但是某一个项目指定在第 5 行。这时，浏览器会自动生成多余的网格，以便放置项目。

grid-auto-columns 属性和 grid-auto-rows 属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与 grid-template-columns 和 grid-template-rows 完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

## 3 项目属性

### 3.1 grid-column-start

grid-column-start 属性，grid-column-end 属性，grid-row-start 属性，grid-row-end 属性

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

- grid-column-start 属性：左边框所在的垂直网格线
- grid-column-end 属性：右边框所在的垂直网格线
- grid-row-start 属性：上边框所在的水平网格线
- grid-row-end 属性：下边框所在的水平网格线

```css
grid-column-start: 1;
grid-column-end: 3;
```

除了指定为第几个网格线，还可以指定为网格线的名字。

```css
grid-column-start: a-start;
grid-column-end: a-end;
```

这四个属性的值还可以使用 span 关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

```css
grid-column-start: span 2;
```

或者

```css
grid-column-end: span 2;
```

上面属性可以用下面的属性简写代替

- gird-column: <start-line>/<end-line>;
- grid-row: <start-line>/<end-line>;

### 3.2 grid-area

grid-area 属性指定项目放在哪一个区域。

```css
gird-area: e;
```

grid-area 属性还可用作 grid-row-start、grid-column-start、grid-row-end、grid-column-end 的合并简写形式，直接指定项目的位置

grid-area: <row-start> / <column-start> / <row-end> / <column-end>;

### 3.3 justify-self

- justify-self: 属性设置单元格内容的水平位置（左中右），跟 justify-items 属性的用法完全一致，但只作用于单个项目。
- align-self: 属性设置单元格内容的垂直位置（上中下），跟 align-items 属性的用法完全一致，也是只作用于单个项目。
- place-self: <align-self> <justify-self>;

## 4 使用

### 4.1 等分响应式布局

```css
grid-tempate-columus: repeat(3, 1fr);
```

### 4.2 固定列宽，改变列数量

```css
grid-tempate-columus: repeat(auto-fit, 100px);
```

### 4.3 宽度相等，改变列数量(去掉右侧空白)

```css
grid-tempate-columus: repeat(auto-fit, minmax(100px, 1fr));
```

### 4.4 宽度不等，去掉右侧空白

```css
/* 容器 */
grid-tempate-columus: repeat(auto-fit, minmax(100px, 1fr));
grid-auto-flow: row dense;
/* 项目 */
gird-cloumn-start: span 3;
```
