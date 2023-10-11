# 富文本

三款主流的富文本编辑器:draft-js、quill、slate

使用体验：

draft-js 和 slate 提供底层能力，可以很自由的进行扩展，但想完成一个功能相对齐全的富文本，需要代码量比较多。

quill 封装性比较高，可以比较轻松的实现一个富文本，还具备一定的扩展能力。

## draft-js

- 不是开箱即用的，需要二次封装

相关资料

- draft-js 官网：https://draftjs.org/
- draft-js 中文文档：https://github.com/mqyqingfeng/draft-js-doc-translation
- draft-js 基础使用：https://zhuanlan.zhihu.com/p/612512816

## quill

react 项目配置 react-quill 使用会方便一些，同时 quill 相关的 api 也是可以使用的

特点

- 简单易用，文档清晰
- 默认包含了常用的功能，下载即用
- 扩展性好，可自定义模块

可以实现的功能：

- 预设默认值
- 插入纯文本或者带格式文本
- 可以自定义主题
- 可以自定义工具栏
- 可以自定义编辑区域

相关资料

- quill 官网：https://quilljs.com/docs/quickstart/
- quill 中文文档：https://www.kancloud.cn/liuwave/quill/1409423
- react-quill api：https://github.com/gtgalone/react-quilljs#readme
- react-quill 基础使用：https://juejin.cn/post/7195124289501134905

例子：

quill

```js
import { useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { saveAs } from 'file-saver';
import { pdfExporter } from 'quill-to-pdf';
import { downloadObjectAsJson } from '../utils/download';

export function QuillEditor() {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem('document') || '[]')
  );
  const editorRef = useRef(null);

  const exportDocument = () => {
    const deltas = editorRef.current?.editor?.getContents();
    if (!deltas) {
      return alert('Content not found');
    }
    downloadObjectAsJson(deltas.ops, 'editor-text');
  };

  const importDocument = (event) => {
    const Jsonfile = event.target.files?.[0];
    var reader = new FileReader();

    if (!Jsonfile) return;

    reader.readAsText(Jsonfile, 'UTF-8');
    reader.onload = function (evt) {
      const delta = JSON.parse(evt.target?.result);
      editorRef.current?.editor?.setContents(delta);
    };
  };
  // 导出为pdf
  const exportAsPDF = async () => {
    const delta = editorRef.current?.editor?.getContents(); // gets the Quill delta
    const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
    saveAs(pdfAsBlob, 'pdf-export.pdf'); // downloads from the browser
  };

  const clearDocument = () => {
    editorRef.current?.editor?.deleteText(0, Infinity);
  };

  return (
    <div className='app'>
      <main className='main-content'>
        <div className='action-container'>
          <button className='button' onClick={exportAsPDF}>
            Export as PDF
          </button>
          <button className='button' onClick={exportDocument}>
            Export as file
          </button>
          <input
            id='import-file'
            type='file'
            className='button'
            onChange={importDocument}
            title='Import file'
            hidden={true}
          />
          <button className='button'>
            <label
              style={{ height: '100%', width: '100%' }}
              htmlFor='import-file'
              className='custom-file-upload'
            >
              Import file
            </label>
          </button>
          <button className='button' onClick={clearDocument}>
            Clear document
          </button>
        </div>
        <ReactQuill
          defaultValue={JSON.parse(localStorage.getItem('document') || '[]')}
          style={{ height: '60vh', width: '100%' }}
          theme='snow'
          value={value}
          onChange={setValue}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }],
              [{ align: [] }],
              [{ font: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ header: 1 }, { header: 2 }],
              [{ size: ['small', false, 'large', 'huge'] }],
              ['blockquote', 'code-block'],
              ['video', 'link', 'formula'],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ],
          }}
          ref={editorRef}
        />
      </main>
    </div>
  );
}
```

## Slate

slate.js 是一个功能强大的富文本编辑器框架， 提供的是底层能力，需要大量的二次开发。

如果不是富文本定制性要求不建议使用，所有逻辑都是通过一系列的插件实现的。

配合 slate-react 去使用

- slate 官网：https://www.slatejs.org/examples/richtext
- 富文本的例子：https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx
- 中文文档：https://rain120.github.io/athena/zh/slate/walkthroughs/01-installing-slate.html
