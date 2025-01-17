import { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import useBookLogic from "./Book.logic";
import { IBook } from '../../models/Book';

interface IBookProps {
    book: IBook;
}

const BookEdit = ({book} : IBookProps) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleEdit } = useBookLogic(book);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      handleEdit(values.title, values.subtitle, values.author_name, values.publish_year);
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Button onClick={showModal}>
        Изменить
      </Button>
      <Modal title="Изменить информацию" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText="Отмена" okText="Готово">
        <Form layout='vertical' form={form} initialValues={{ 
          title: book.title, 
          subtitle: book.subtitle, 
          author_name: book.author_name?.join(', '), 
          publish_year: book.publish_year?.join(', ') 
          }}>
            <Form.Item label="Название" name="title">
                <Input />
            </Form.Item>
            <Form.Item label="Подзаголовок" name="subtitle">
                <Input />
            </Form.Item>
            <Form.Item label="Авторы" name="author_name">
                <Input />
            </Form.Item>
            <Form.Item label="Годы публикации" name="publish_year">
                <Input />
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BookEdit;