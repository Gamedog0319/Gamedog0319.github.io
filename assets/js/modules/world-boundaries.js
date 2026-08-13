/* Rithvik Portfolio natural world boundary.
   Mountains are instanced for low draw-call cost; water uses lightweight static geometry. */
(() => {
  "use strict";

  const NAV_BOUNDS = Object.freeze({
    desktopX: 30,
    desktopZ: 23,
    mobileX: 28,
    mobileZ: 21
  });

  function seeded(index, salt = 0) {
    const x = Math.sin(index * 91.731 + salt * 17.13) * 43758.5453;
    return x - Math.floor(x);
  }

  function createRibbon(THREE, points, width, y, material) {
    const vertices = [];
    const indices = [];
    for (let i = 0; i < points.length; i++) {
      const prev = points[Math.max(0, i - 1)];
      const next = points[Math.min(points.length - 1, i + 1)];
      const tx = next[0] - prev[0];
      const tz = next[1] - prev[1];
      const length = Math.hypot(tx, tz) || 1;
      const nx = -tz / length;
      const nz = tx / length;
      const half = width * 0.5;
      vertices.push(points[i][0] + nx * half, y, points[i][1] + nz * half);
      vertices.push(points[i][0] - nx * half, y, points[i][1] - nz * half);
      if (i < points.length - 1) {
        const a = i * 2, b = a + 1, c = a + 2, d = a + 3;
        indices.push(a, c, b, b, c, d);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    return mesh;
  }

  function irregularShape(THREE, rx, rz, segments = 32, seed = 1) {
    const shape = new THREE.Shape();
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const wobble = 0.88 + seeded(i, seed) * 0.18 + Math.sin(a * 3 + seed) * 0.035;
      const x = Math.cos(a) * rx * wobble;
      const z = Math.sin(a) * rz * wobble;
      if (i === 0) shape.moveTo(x, z); else shape.lineTo(x, z);
    }
    shape.closePath();
    return shape;
  }

  function addLake({ THREE, scene, shared, x, z, rx, rz, seed }) {
    const shoreMat = new THREE.MeshStandardMaterial({ color: 0xb7a47c, roughness: 1, metalness: 0 });
    const shore = new THREE.Mesh(new THREE.ShapeGeometry(irregularShape(THREE, rx + 1.5, rz + 1.25, 36, seed)), shoreMat);
    shore.rotation.x = -Math.PI / 2;
    shore.position.set(x, 0.015, z);
    scene.add(shore);

    const lake = new THREE.Mesh(new THREE.ShapeGeometry(irregularShape(THREE, rx, rz, 36, seed + 13)), shared.water);
    lake.rotation.x = -Math.PI / 2;
    lake.position.set(x, 0.07, z);
    scene.add(lake);
    return lake;
  }

  function addBridge({ THREE, scene, shared, x, z, length = 15, width = 6.4 }) {
    const deckMat = new THREE.MeshStandardMaterial({ color: 0x737980, roughness: 0.78, metalness: 0.08 });
    const curbMat = new THREE.MeshStandardMaterial({ color: 0xc9c4b8, roughness: 0.9 });
    const railMat = shared.metal || new THREE.MeshStandardMaterial({ color: 0x667079, roughness: 0.5, metalness: 0.5 });

    const deck = new THREE.Mesh(new THREE.BoxGeometry(length, 0.5, width), deckMat);
    deck.position.set(x, 0.34, z);
    deck.receiveShadow = true;
    scene.add(deck);

    [-1, 1].forEach(side => {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(length, 0.38, 0.32), curbMat);
      curb.position.set(x, 0.58, z + side * (width * 0.5 - 0.18));
      scene.add(curb);
      const rail = new THREE.Mesh(new THREE.BoxGeometry(length, 0.11, 0.09), railMat);
      rail.position.set(x, 1.04, z + side * (width * 0.5 - 0.24));
      scene.add(rail);
      for (let i = -3; i <= 3; i++) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 0.1), railMat);
        post.position.set(x + i * (length / 7), 0.83, z + side * (width * 0.5 - 0.24));
        scene.add(post);
      }
    });

    const lineMat = new THREE.MeshBasicMaterial({ color: 0xf5e7b5 });
    for (let i = -2; i <= 2; i++) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.12), lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x + i * 2.7, 0.605, z);
      scene.add(line);
    }
  }

  function addMountains({ THREE, scene, mobile, veryLowEnd }) {
    const mountainCount = veryLowEnd ? 18 : mobile ? 24 : 44;
    const geometry = new THREE.ConeGeometry(1, 1, 6, 1, false);
    const mountainMat = new THREE.MeshLambertMaterial({ color: 0x5d735c });
    const snowMat = new THREE.MeshLambertMaterial({ color: 0xdce3df });
    const mountains = new THREE.InstancedMesh(geometry, mountainMat, mountainCount);
    const caps = new THREE.InstancedMesh(geometry, snowMat, mountainCount);
    const dummy = new THREE.Object3D();

    const positions = [];
    const sideCounts = [Math.ceil(mountainCount * .28), Math.ceil(mountainCount * .28), Math.floor(mountainCount * .22), Math.floor(mountainCount * .22)];
    let id = 0;

    function pushSide(side, count) {
      for (let i = 0; i < count && positions.length < mountainCount; i++) {
        const t = count <= 1 ? .5 : i / (count - 1);
        const jitter = (seeded(id, 4) - .5) * 8;
        if (side === "north") positions.push([-74 + t * 148 + jitter, 58 + seeded(id, 8) * 7]);
        if (side === "south") positions.push([-74 + t * 148 + jitter, -58 - seeded(id, 9) * 7]);
        if (side === "west") positions.push([-74 - seeded(id, 10) * 7, -50 + t * 100 + jitter]);
        if (side === "east") positions.push([74 + seeded(id, 11) * 7, -50 + t * 100 + jitter]);
        id++;
      }
    }

    pushSide("north", sideCounts[0]);
    pushSide("south", sideCounts[1]);
    pushSide("west", sideCounts[2]);
    pushSide("east", sideCounts[3]);
    while (positions.length < mountainCount) positions.push([74, -45 + positions.length * 3]);

    positions.forEach(([x, z], i) => {
      const h = 10 + seeded(i, 21) * 17;
      const r = 5.5 + seeded(i, 22) * 6.5;
      dummy.position.set(x, h * .5 - .08, z);
      dummy.rotation.y = seeded(i, 23) * Math.PI;
      dummy.scale.set(r, h, r);
      dummy.updateMatrix();
      mountains.setMatrixAt(i, dummy.matrix);

      const capH = h * (.22 + seeded(i, 25) * .08);
      const capR = r * .38;
      dummy.position.set(x, h - capH * .54, z);
      dummy.rotation.y = seeded(i, 23) * Math.PI;
      dummy.scale.set(capR, capH, capR);
      dummy.updateMatrix();
      caps.setMatrixAt(i, dummy.matrix);
    });

    mountains.instanceMatrix.needsUpdate = true;
    caps.instanceMatrix.needsUpdate = true;
    mountains.receiveShadow = true;
    mountains.computeBoundingSphere?.();
    caps.computeBoundingSphere?.();
    scene.add(mountains, caps);

    // Darker low foothills make the boundary feel continuous without more draw calls.
    const footGeom = new THREE.ConeGeometry(1, 1, 5, 1, false);
    const footMat = new THREE.MeshLambertMaterial({ color: 0x708268 });
    const foothillCount = Math.max(10, Math.floor(mountainCount * .55));
    const foothills = new THREE.InstancedMesh(footGeom, footMat, foothillCount);
    for (let i = 0; i < foothillCount; i++) {
      const a = (i / foothillCount) * Math.PI * 2;
      const x = Math.cos(a) * (70 + seeded(i, 31) * 8);
      const z = Math.sin(a) * (55 + seeded(i, 32) * 7);
      const h = 5 + seeded(i, 33) * 8;
      const r = 5 + seeded(i, 34) * 5;
      dummy.position.set(x, h * .5 - .12, z);
      dummy.rotation.y = seeded(i, 35) * Math.PI;
      dummy.scale.set(r, h, r);
      dummy.updateMatrix();
      foothills.setMatrixAt(i, dummy.matrix);
    }
    foothills.instanceMatrix.needsUpdate = true;
    foothills.computeBoundingSphere?.();
    scene.add(foothills);
  }

  function createNaturalBoundary(options) {
    const { THREE, scene, shared, mobile, veryLowEnd } = options;
    if (!THREE || !scene || !shared) return null;

    addMountains({ THREE, scene, mobile, veryLowEnd });

    const bankMat = new THREE.MeshLambertMaterial({ color: 0x78936c });
    const riverPoints = [[-62, 67], [-59, 50], [-61, 34], [-58, 18], [-60, 2], [-57, -16], [-59, -34], [-64, -64]];
    scene.add(createRibbon(THREE, riverPoints, 11.5, 0.025, bankMat));
    const river = createRibbon(THREE, riverPoints, 7.4, 0.075, shared.water);
    scene.add(river);

    addLake({ THREE, scene, shared, x: 66, z: 33, rx: 10.8, rz: 7.1, seed: 8 });
    addLake({ THREE, scene, shared, x: -70, z: -36, rx: 8.8, rz: 6.0, seed: 19 });

    // Three bridges line up with the town's major east/west roads.
    addBridge({ THREE, scene, shared, x: -58.5, z: -23, length: 15.5, width: 5.7 });
    addBridge({ THREE, scene, shared, x: -59.0, z: 0, length: 16.0, width: 8.0 });
    addBridge({ THREE, scene, shared, x: -59.0, z: 23, length: 15.5, width: 5.7 });

    // Short road approaches make the bridge connections visually deliberate.
    const roadMat = shared.road;
    [[-56.5, -23, 9, 5], [-56.5, 0, 9, 8], [-56.5, 23, 9, 5]].forEach(([x, z, w, d]) => {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(w, d), roadMat);
      road.rotation.x = -Math.PI / 2;
      road.position.set(x, 0.08, z);
      scene.add(road);
    });

    return { river };
  }

  window.RithvikWorld = Object.freeze({ NAV_BOUNDS, createNaturalBoundary });
})();
