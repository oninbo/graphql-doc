import React from 'react';
import { Icon, Tag } from 'antd';
import { Link } from 'react-router-dom';

const Header = (props) => {

  return (
    <header>
      <Icon type={ props.icon || 'laptop' } />
      <div className="info">
        <div className="title">{ props.title }</div>
        <div className="subtitle">
          {
            <span>
	      Kind:
	      {
                props.type.kind &&
                  <Tag color="blue">{ props.type.kind }</Tag>
	      }
              {
                props.type.ofType &&
                  props.type.ofType.kind &&
                  <Tag color="blue">{ props.type.ofType.kind }</Tag>
              }
              {
                props.type.ofType &&
                  props.type.ofType.ofType &&
                  props.type.ofType.ofType.kind &&
                  <Tag color="blue">{ props.type.ofType.ofType.kind }</Tag>
              }
              {
                props.type.ofType &&
                  props.type.ofType.ofType &&
                  props.type.ofType.ofType.ofType &&
                  props.type.ofType.ofType.ofType.kind &&
                  <Tag color="blue">
                    { props.type.ofType.ofType.ofType.kind }
                  </Tag>
              }
            </span>
          }
          {
            <span>
              Type:
              {
                props.type.name &&
                  <Tag color="#607D8B">
                    <Link to={ `/introspect/info?name=${ props.type.name }` }>
                      { props.type.name }
                    </Link>
                  </Tag>
              }
              {
                props.type.ofType &&
                  props.type.ofType.name &&
                  <Tag color="#607D8B">
                    <Link to={ `/introspect/info?name=${ props.type.ofType.name }` }>
                      { props.type.ofType.name }
                    </Link>
                  </Tag>
              }
              {
                props.type.ofType &&
                  props.type.ofType.ofType &&
                  props.type.ofType.ofType.name &&
                  <Tag color="#607D8B">
                    <Link to={ `/introspect/info?name=${ props.type.ofType.ofType.name }` }>
                      { props.type.ofType.ofType.name }
                    </Link>
                  </Tag>
              }
              {
                props.type.ofType &&
                  props.type.ofType.ofType &&
                  props.type.ofType.ofType.ofType &&
                  props.type.ofType.ofType.ofType.name &&
                  <Tag color="#607D8B">
                    <Link to={ `/introspect/info?name=${ props.type.ofType.ofType.ofType.name }` }>
                      { props.type.ofType.ofType.ofType.name }
                    </Link>
                  </Tag>
              }
            </span>
          }
        </div>
      </div>
    </header>
  );

}


export default Header;
