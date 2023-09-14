import { SetStateAction, useMemo, useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './index.less';
import { defaultValue } from './config';

export default function () {
  const [value, setValue] = useState('');
  const quillRef = useRef(null);

  const editor = useMemo(() => {
    console.log(quillRef);
    if (!quillRef.current) return null;
    return quillRef.current.getEditor();
  }, [quillRef.current]);

  const ReactQuillProps = useMemo(
    () => ({
      modules: {
        toolbar: {
          handlers: {
            clean: () => setValue(''),
          },
          container: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
          ],
        },
      },
      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
      ],
    }),
    [setValue],
  );

  const onChange = (value: SetStateAction<string>) => {
    setValue(value);
    // if (editor) console.log(editor.getText());
    console.log(editor.root.innerHTML);
  };
  const insert = () => {
    console.log(quillRef.current, editor);
    if (!quillRef.current || !editor) return;
    console.log(editor);
    let index = editor.selection.savedRange.index;
    const text = 'LIANG';
    console.log(index);
    // 插入文本
    // editor.insertText(index, text);
    // index += text.length;
    // editor.setSelection(index);
    //插入文本至光标位置，可自定义行内样式，前后添加空格，防止输入文本会带上自定义样式
    editor.clipboard.dangerouslyPasteHTML(
      index,
      `<h1 style="font-size: 18px;">${text}</h1>`,
    );
    index += text.length;
    editor.setSelection(index);
  };
  useEffect(() => {
    console.log(quillRef.current);

    setValue(' ');
  }, []);
  return (
    <div className={styles.ReactQuillWrapper}>
      <div className={styles.left}>
        <div onClick={() => setValue(defaultValue)}>大纲模板</div>
        <div onClick={insert}>插入文字</div>
      </div>
      <div className={styles.middle}>
        <ReactQuill
          ref={quillRef}
          className={styles.ReactQuillContent}
          theme="snow"
          value={value}
          onChange={onChange}
          onBlur={() => {}}
          {...ReactQuillProps}
        ></ReactQuill>
      </div>
      <div className={styles.right}>
        <img src={require('@/assets/a.png')} alt="" width="300" />
        文字粘贴复制
      </div>
    </div>
  );
}
