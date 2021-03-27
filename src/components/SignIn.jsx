import React from 'react';

export default function SignIn({
  onChange, onSubmit, onClick, fields,
}) {
  const { email, password } = fields;

  // console.log('fields ? ', fields);

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    onChange({ name, value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit();
  }

  return (
    <>
      <section>
        <h1>Room Preview 🏠</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <button type="submit">방보러 가볼까요? 👉🏻</button>
        </form>
        <button type="button" onClick={onClick}>로그인 없이 구경하기 👀</button>
      </section>
    </>
  );
}
