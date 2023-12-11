import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { GrSend } from 'react-icons/gr';

export default function about() {
  return (
    <div className="todolist">
      <div className="about-information">
        <p>
          This is a MERN stack web application. It handles all CRUD operations
          on tasks and user account (create, view, update and delete) and user
          profile info (update and add user image). With all authentication and
          authorization handled at the backend using Node.js, like hash
          encryption of passwords and access management with JWT tokens.
          <br />
          <br />
        </p>
        <p
          style={{
            fontWeight: '500',
            fontSize: '2rem',
            color: '#222',
            textAlign: 'center',
            marginTop: '20px',
            fontFamily: 'monospace',
          }}
        >
          Get in touch
        </p>
      </div>
      <div className="about-section">
        <div>
          <div className="icon">
            <a href="/" target="_blank">
              <FaGithub fontSize="4rem" color="#333" />
            </a>
          </div>
        </div>
        <div>
          <div className="icon">
            <a href="/" target="_blank">
              <FaLinkedin fontSize="4rem" color="#333" />
            </a>
          </div>
        </div>
        <div>
          <div className="icon">
            <a href="/" target="_blank">
              <GrSend fontSize="4rem" color="#333" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
