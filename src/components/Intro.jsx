import React from 'react';

export default function Intro({ onClick }) {
  return (
    <>
      <section>
        <h2>Welcome, RoomPreview!</h2>
        <p>
          이 서비스는 여러분이 살고싶은 집에 미리 살아본 사람들의 경험담을 공유하여 여러분이 후회없는 선택을 할 수 있도록 도와줍니다
        </p>
        <p>
          <button
            type="button"
            onClick={onClick}
          >
            회원가입

          </button>
        </p>
      </section>
    </>
  );
}
