function HelloWorld(props: { name: string }) {
    let { name } = props;
    return (
        <div>Hello World {name}</div>
    );
}

export default HelloWorld;

